/**
 * Converts a Base64-encoded string into a Uint8Array representing the binary data.
 *
 * @param base64 - The Base64-encoded string to decode.
 * @returns A Uint8Array containing the decoded binary data.
 */
export function base64ToArrayBuffer(base64: string) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return bytes;
}

export function arrayBufferToBase64(buffer: Uint8Array) {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

/**
 * Converts a UUID string to its bit representation as a string of 0s and 1s.
 * Example: "123e4567-e89b-12d3-a456-426614174000"
 * Output: "00010010001111100100010101100111111010001001101100010010110100111010010001010110010000100110011000010100000101110100000000000000"
 *
 * @param uuid - The UUID string.
 * @returns The bit representation as a string of 0s and 1s.
 */
export function uuidToBits(uuid: string): string {
  // Remove hyphens
  const hex = uuid.replace(/-/g, "");
  // Convert each hex character to 4 bits
  return hex
    .split("")
    .map(char => parseInt(char, 16).toString(2).padStart(4, "0"))
    .join("");
}

/**
 * Converts a UUID string to its integer (BigInt) representation.
 * @param uuid - The canonical UUID string (e.g., "123e4567-e89b-12d3-a456-426655440000")
 * @returns BigInt representing the UUID as a 128-bit integer
 */
export function uuidToBigInt(uuid: string): bigint {
  // Remove hyphens
  const hex = uuid.replace(/-/g, "");
  if (!/^[0-9a-fA-F]{32}$/.test(hex)) {
    throw new Error("Invalid UUID format");
  }
  // Convert hex string to BigInt
  return BigInt("0x" + hex);
}
