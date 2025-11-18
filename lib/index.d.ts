declare module 'jpack-schema' {
  export interface JPackSchema {
    schema: Record<string, any>;
    data: any[];
  }

  export interface CompressionStats {
    originalSize: number;
    compressedSize: number;
    reduction: number;
    compressionRatio: number;
    compressionPercentage: string;
  }

  export interface PackResult {
    compressed: JPackSchema | any;
    stats: CompressionStats;
    original: any;
  }

  /**
   * Compresses JSON data using JPack Schema format
   */
  export function compress(data: any): JPackSchema | any;

  /**
   * Decompresses JPack Schema format back to original JSON
   */
  export function decompress(compressedData: JPackSchema): any;

  /**
   * Calculates compression statistics
   */
  export function getStats(original: any, compressed: JPackSchema | any): CompressionStats;

  /**
   * All-in-one function that compresses data and returns both result and stats
   */
  export function pack(data: any): PackResult;

  /**
   * Validates if data is in JPack Schema format
   */
  export function isJPackSchema(data: any): data is JPackSchema;

  export const version: string;
}