import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_API_BASE_URL: z.url(),
});

// Pega o valor enviado como parâmetro (process.env) e valida que o ele segue o formato estabelecido por envSchema
const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  // flatten() tranforma os erros que acontecem na validação em um formato mais legível
  console.error(
    "Invalid environment variables",
    parsedEnv.error.flatten().fieldErrors
  );

  // Para a execução da aplicação lançando o erro
  throw new Error("Invalid environment variables.");
}

export const env = parsedEnv.data;
