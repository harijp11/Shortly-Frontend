import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Copy, ExternalLink, Trash2 } from "lucide-react";

interface UrlDetailCardProps {
  url: {
    id: string;
    shortUrl: string;
    originalUrl: string;
    clicks: number;
    createdAt: string;
    customUrl?: string | null;
    shortCode: string;
    lastClicked?: string | null;
  };
  copiedId: string | null;
  isDeleting: string | null;
  onCopy: (shortUrl: string, id: string) => void;
  onOpenUrl: (shortCode: string) => void;
  onDelete: (id: string) => void;
}

export function UrlDetailCard({
  url,
  copiedId,
  isDeleting,
  onCopy,
  onOpenUrl,
  onDelete,
}: UrlDetailCardProps) {
  return (
    <div className="border rounded-lg p-4 space-y-3">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            <Badge variant="secondary" className="text-xs">
              {url.clicks} clicks
            </Badge>
            <span className="text-xs text-gray-500">Created {url.createdAt}</span>
            {url.customUrl && (
              <Badge variant="outline" className="text-xs">
                Custom
              </Badge>
            )}
            {url.lastClicked && (
              <span className="text-xs text-gray-500">
                Last clicked: {new Date(url.lastClicked).toLocaleDateString()}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <div>
              <p className="text-sm font-medium text-gray-900 mb-1">Short URL:</p>
              <div className="flex items-center space-x-2">
                <code className="text-sm bg-gray-100 px-2 py-1 rounded flex-1 min-w-0 truncate">
                  {url.shortUrl}
                </code>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onCopy(url.shortUrl, url.id)}
                >
                  {copiedId === url.id ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onOpenUrl(url.shortCode)}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 mb-1">Original URL:</p>
              <p className="text-sm text-gray-600 truncate">{url.originalUrl}</p>
            </div>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDelete(url.id)}
          disabled={isDeleting === url.id}
          className="ml-4 text-red-600 hover:text-red-700"
        >
          {isDeleting === url.id ? (
            <div className="animate-spin h-4 w-4 border-2 border-red-600 border-t-transparent rounded-full" />
          ) : (
            <Trash2 className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}