import { ZodError } from "zod";

/**
 * Utility function untuk mengubah ZodError menjadi string pesan yang mudah dibaca.
 * @param error - ZodError atau string error biasa.
 * @returns String pesan error yang sudah diformat.
 */
export function parseValidationMessage(error: unknown): string {
  if (error instanceof ZodError) {
    // Jika error adalah ZodError, kita akan mengubahnya menjadi string yang lebih mudah dibaca
    return error.errors
      .map((err) => {
        // Gabungkan path (field yang error) dengan pesan errornya
        const field = err.path.join(".");
        return `${field}: ${err.message}`;
      })
      .join(", "); // Gabungkan semua pesan error menjadi satu string
  }

  // Jika error bukan ZodError, kembalikan pesan error sebagai string
  return typeof error === "string" ? error : "Validation failed";
}
