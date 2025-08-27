'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Share2, Loader2 } from 'lucide-react';
import { GenerationState } from './types';

interface ResultPanelProps {
  generationState: GenerationState;
}

export function ResultPanel({ generationState }: ResultPanelProps) {
  const { isGenerating, result, error } = generationState;

  const handleDownload = () => {
    if (!result) return;
    
    const link = document.createElement('a');
    link.href = result.url;
    link.download = result.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (!result) return;
    
    try {
      await navigator.share({
        title: 'Generated Image',
        url: result.url,
      });
    } catch (err) {
      // Fallback to copying URL
      navigator.clipboard.writeText(result.url);
    }
  };

  return (
    <Card className="h-fit border-none shadow-none py-2">
      <CardContent className="p-6">
        <div className="space-y-4">
          
          <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
            {isGenerating ? (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary" />
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Generating your image...</p>
                    <p className="text-xs text-muted-foreground">
                      This may take a few moments
                    </p>
                  </div>
                </div>
              </div>
            ) : result ? (
              <img
                src={result.url}
                alt="Generated result"
                className="w-full h-full object-cover"
              />
            ) : error ? (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center space-y-2">
                  <p className="text-sm text-red-600">Generation failed</p>
                  <p className="text-xs text-muted-foreground">{error}</p>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Generated image will appear here
                  </p>
                </div>
              </div>
            )}
          </div>

          {result && !isGenerating && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                className="flex-1"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="flex-1"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
