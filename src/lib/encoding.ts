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