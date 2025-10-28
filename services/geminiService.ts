import { GoogleGenAI, Type } from "@google/genai";
import { Diagnosis, SymptomAnalysis, UnifiedAnalysisResponse } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const diagnosisSchema = {
  type: Type.OBJECT,
  properties: {
    is_medical_condition: {
      type: Type.BOOLEAN,
      description: "Determina si el término de entrada es una condición médica, enfermedad o síntoma. Establécelo en 'true' si lo es, de lo contrario, establécelo en 'false'."
    },
    name: {
      type: Type.STRING,
      description: "El nombre oficial de la enfermedad. Llenar solo si 'is_medical_condition' es true.",
    },
    description: {
      type: Type.STRING,
      description: "Un resumen conciso de una párrafo sobre qué es la enfermedad. Llenar solo si 'is_medical_condition' es true.",
    },
    causes: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
      },
      description: "Una lista de causas comunes o factores de riesgo para la enfermedad. Llenar solo si 'is_medical_condition' es true.",
    },
    symptoms: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
      },
      description: "Una lista de los síntomas primarios asociados con la enfermedad. Llenar solo si 'is_medical_condition' es true.",
    },
    medications: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
      },
      description: "Una lista de medicamentos o tratamientos comúnmente recetados. Llenar solo si 'is_medical_condition' es true.",
    },
  },
  required: ["is_medical_condition"],
};


const symptomAnalysisSchema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING, description: "El nombre del síntoma identificado (ej. 'Tos', 'Estornudo')." },
    description: { type: Type.STRING, description: "Descripción concisa del síntoma." },
    causes: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Causas comunes o enfermedades que provocan el síntoma." },
    symptoms: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Otros síntomas comúnmente asociados." },
    prevention: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Medidas de prevención o tratamiento. Incluir descargo de responsabilidad." },
  },
  required: ["name", "description", "causes", "symptoms", "prevention"],
};

const unifiedResponseSchema = {
    type: Type.OBJECT,
    properties: {
        symptomAnalysis: { ...symptomAnalysisSchema, nullable: true, description: "Completa este objeto si se detecta un sonido de síntoma." },
        conversationalResponse: { type: Type.STRING, nullable: true, description: "Completa esta cadena si se detecta una conversación de voz." },
    },
    description: "Si el audio contiene un síntoma (tos, estornudo), rellena 'symptomAnalysis'. Si contiene voz, rellena 'conversationalResponse'. Solo uno de los dos debe ser rellenado."
}


export const getDiseaseInfo = async (diseaseName: string): Promise<Diagnosis | null> => {
  try {
    const prompt = `Analiza el término: "${diseaseName}".
    1. Primero, determina si es una condición médica, enfermedad o síntoma real.
    2. Si SÍ lo es, establece 'is_medical_condition' en 'true' y proporciona una explicación detallada incluyendo nombre, descripción, causas, síntomas y medicamentos.
    3. Si NO es una condición médica, establece 'is_medical_condition' en 'false' y deja los demás campos del esquema vacíos.
    Responde en español y sigue estrictamente el esquema JSON proporcionado. Incluye un descargo de responsabilidad sobre el consejo médico en la sección de medicamentos si procede.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: diagnosisSchema,
      },
    });

    const jsonText = response.text.trim();
    // Usar un tipo temporal para la validación que incluye el campo de clasificación.
    const result: Partial<Diagnosis> & { is_medical_condition?: boolean } = JSON.parse(jsonText);

    // Si el modelo lo clasificó como no médico, devuelve null.
    if (result.is_medical_condition === false || result.is_medical_condition === undefined) {
      return null;
    }

    // Validación secundaria de la estructura si SÍ es una condición médica.
    if (!result.name || !result.description || !result.symptoms || !result.causes || !result.medications) {
      console.error("La API indicó que es una condición médica, pero los datos están incompletos.", result);
      throw new Error("Datos de diagnóstico incompletos recibidos de la API.");
    }

    // Construir un objeto Diagnosis válido para devolver.
    const diagnosis: Diagnosis = {
      name: result.name,
      description: result.description,
      causes: result.causes,
      symptoms: result.symptoms,
      medications: result.medications,
    };
    
    return diagnosis;

  } catch (error) {
    console.error("Error al obtener información de la enfermedad desde la API de Gemini:", error);
    // Volver a lanzar el error para que sea manejado por la función que llama.
    throw new Error(`No se pudo procesar la información para "${diseaseName}".`);
  }
};

export const analyzeAudio = async (audioBase64: string, mimeType: string): Promise<UnifiedAnalysisResponse> => {
  const audioPart = {
    inlineData: { data: audioBase64, mimeType },
  };
  const textPart = {
    text: `Analiza este audio y responde en español.
- Si detectas un sonido de síntoma claro (tos, estornudo, congestión), rellena el objeto 'symptomAnalysis'.
- Si detectas una conversación de voz, actúa como 'BAYMAX', un asistente de salud IA masculino con una personalidad amable y calmada. Usa pronombres masculinos para referirte a ti mismo (ej. "estoy aquí para ayudarte"). Responde a la pregunta en 'conversationalResponse'. Sé breve y claro.
- Si no está claro, responde en 'conversationalResponse' pidiendo al usuario que lo intente de nuevo.
Solo uno de los dos campos debe ser rellenado.`
  };
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: { parts: [audioPart, textPart] },
      config: {
        responseMimeType: "application/json",
        responseSchema: unifiedResponseSchema,
        thinkingConfig: { thinkingBudget: 0 }
      },
    });

    const parsedJson: UnifiedAnalysisResponse = JSON.parse(response.text.trim());
    if (parsedJson.symptomAnalysis || parsedJson.conversationalResponse) {
        return parsedJson;
    }
    throw new Error("La respuesta de la API no contenía ni análisis de síntoma ni respuesta conversacional.");

  } catch (error) {
    console.error("Error al analizar el audio con la API de Gemini:", error);
    throw new Error("No se pudo analizar el audio. Por favor, inténtalo de nuevo.");
  }
};