import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function GET(request, { params }) {
  try {
    // In Next.js 15+, params is a Promise and needs to be awaited
    const resolvedParams = await params;
    // Get the filename from the path parameter
    const filename = Array.isArray(resolvedParams.path) 
      ? resolvedParams.path.join('/') 
      : resolvedParams.path;
    
    // Security: Prevent directory traversal
    if (filename.includes('..')) {
      return new NextResponse('Invalid path', { status: 400 });
    }
    
    // Construct the file path
    const filePath = join(process.cwd(), 'uploads', filename);
    
    // Check if file exists in uploads folder
    if (!existsSync(filePath)) {
      // Backward compatibility: Check public folder for old images
      const publicFilePath = join(process.cwd(), 'public', filename);
      if (existsSync(publicFilePath)) {
        const fileBuffer = await readFile(publicFilePath);
        const ext = filename.split('.').pop().toLowerCase();
        const contentTypes = {
          jpg: 'image/jpeg',
          jpeg: 'image/jpeg',
          png: 'image/png',
          gif: 'image/gif',
          webp: 'image/webp',
          svg: 'image/svg+xml',
        };
        const contentType = contentTypes[ext] || 'application/octet-stream';
        return new NextResponse(fileBuffer, {
          headers: {
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=31536000, immutable',
          },
        });
      }
      return new NextResponse('File not found', { status: 404 });
    }
    
    // Read the file
    const fileBuffer = await readFile(filePath);
    
    // Determine content type based on file extension
    const ext = filename.split('.').pop().toLowerCase();
    const contentTypes = {
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      gif: 'image/gif',
      webp: 'image/webp',
      svg: 'image/svg+xml',
    };
    const contentType = contentTypes[ext] || 'application/octet-stream';
    
    // Return the image with appropriate headers
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error serving image:', error);
    return new NextResponse('Error serving image', { status: 500 });
  }
}

