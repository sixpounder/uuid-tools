/**
 * Represents a function that generates a UUID string.
 *
 * @param args - Optional arguments that may be used by the provider implementation.
 * @returns A UUID string.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UUIDProvider = (...args: any[]) => string;

/**
 * Represents a specific version of a UUID, including its name, description, and the provider responsible for generating it.
 *
 * @property name - The name of the UUID version (e.g., "v1", "v4").
 * @property description - A human-readable description of the UUID version.
 * @property provider - The provider implementation that generates UUIDs of this version.
 */
export interface UUIDVersion {
  name: string;
  description: string;
   
  provider: UUIDProvider;
}