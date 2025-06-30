import * as fs from 'fs/promises';
import * as path from 'path';

import { ConfigService } from '@nestjs/config';
/**
 * Service for managing file assets (save, read, delete) on the filesystem.
 * Used for handling user profile pictures and other binary assets.
 */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AssetService {
    private readonly assetPath: string;
    /**
     * Constructs the AssetService and sets the asset storage path.
     * @param config The configuration service
     */
    constructor(private readonly config: ConfigService) {
        this.assetPath = this.config.get<string>('ASSET_PATH') || path.join(__dirname, '..', 'assets');
    }

    /**
     * Saves a file asset to disk.
     * @param fileName The name of the file to save
     * @param content The file content as a Buffer
     * @returns The file name
     */
    async saveAsset(fileName: string, content: Buffer): Promise<string> {
        const filePath = path.join(this.assetPath, fileName);
        await fs.writeFile(filePath, content);
        return fileName;
    }

    /**
     * Reads a file asset from disk.
     * @param fileName The name of the file to read
     * @returns The file content as a Buffer
     * @throws Error if the asset is not found
     */
    async readAsset(fileName: string): Promise<Buffer> {
        const filePath = path.join(this.assetPath, fileName);
        try {
            return await fs.readFile(filePath);
        } catch (error) {
            throw new Error(`Asset not found: ${fileName}`);
        }   
    }

    /**
     * Deletes a file asset from disk.
     * @param fileName The name of the file to delete
     * @throws Error if the asset cannot be deleted
     */
    async deleteAsset(fileName: string): Promise<void> {
        const filePath = path.join(this.assetPath, fileName);
        try {
            await fs.unlink(filePath);
        } catch (error) {
            throw new Error(`Failed to delete asset: ${fileName}`);
        }   
    }
}
