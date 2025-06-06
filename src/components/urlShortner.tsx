"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/slice/store";
import { logout } from "@/slice/userSlice";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Link2,
  Copy,
  ExternalLink,
  User,
  LogOut,
  AlertCircle,
  CheckCircle2,
  Trash2,
  BarChart3,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { shortenUrl, getUserUrls, deleteUrl } from "@/services/userUrlService";
// import { getRedirectInfo } from "@/services/userUrlService";

interface ShortenedUrl {
  id: string;
  originalUrl: string;
  shortUrl: string;
  clicks: number;
  createdAt: string;
  customUrl?: string | null;
  shortCode: string;
  lastClicked?: string | null;
}

interface ErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export default function UrlShortener() {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [url, setUrl] = useState("");
  const [customUrl, setCustomUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [shortenedUrls, setShortenedUrls] = useState<ShortenedUrl[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const validateUrl = (url: string): boolean => {
    try {
      new URL(
        url.startsWith("http://") || url.startsWith("https://")
          ? url
          : `https://${url}`
      );
      return true;
    } catch {
      return false;
    }
  };

  const fetchUserUrls = async () => {
    try {
      const response = await getUserUrls();
      if (response.success) {
        const mappedUrls: ShortenedUrl[] = response.data.map((url) => ({
          id: url.id,
          originalUrl: url.longUrl,
          shortUrl: url.shortUrl,
          clicks: url.totalClicks,
          createdAt: new Date(url.createdAt).toLocaleDateString(),
          customUrl: url.customUrl,
          shortCode: url.shortCode,
          lastClicked: url.lastClicked,
        }));
        setShortenedUrls(mappedUrls);
      }
    } catch (error) {
      console.error(error);
      setError("Failed to fetch URLs");
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserUrls();
    }
  }, [user]);

  const handleShortenUrl = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }

    if (!validateUrl(url)) {
      setError("Please enter a valid URL");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await shortenUrl(url, customUrl || undefined);
      if (response.success) {
        const newShortenedUrl: ShortenedUrl = {
          id: response.data.id,
          originalUrl: response.data.longUrl,
          shortUrl: response.data.shortUrl,
          clicks: response.data.totalClicks,
          createdAt: new Date(response.data.createdAt).toLocaleDateString(),
          customUrl: response.data.customUrl,
          shortCode: response.data.shortCode,
        };
        setShortenedUrls((prev) => [newShortenedUrl, ...prev]);
        setUrl("");
        setCustomUrl("");
      } else {
        setError(response.message || "Failed to shorten URL");
      }
    } catch (error) {
      const err = error as ErrorResponse;
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Failed to shorten URL. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const handleOpenUrl = async (shortCode: string) => {
    try {
      const apiUrl =
        import.meta.env.VITE_API_URL || "http://localhost:5000/api/user";
      const redirectUrl = `${apiUrl}/${shortCode}`;
      window.open(redirectUrl, "_blank");
    } catch (error) {
      console.error("handleOpenUrl error:", error);
      setError("Failed to open URL");
    }
  };

  const handleDeleteUrl = async (id: string) => {
    setIsDeleting(id);
    try {
      const response = await deleteUrl(id);
      if (response.success) {
        setShortenedUrls((prev) => prev.filter((url) => url.id !== id));
      } else {
        setError(response.message || "Failed to delete URL");
      }
    } catch (error) {
      const err = error as ErrorResponse;
      console.error(err);
      setError(err.response?.data?.message || "Failed to delete URL");
    } finally {
      setIsDeleting(null);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-primary/10 rounded-full">
                <Link2 className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">URL Shortener</CardTitle>
            <CardDescription>
              Shorten your long URLs and track their performance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Please log in to start shortening your URLs and track analytics.
              </AlertDescription>
            </Alert>
            <Button
              onClick={() => navigate("/login")}
              className="w-full"
              size="lg"
            >
              Please Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Link2 className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">URL Shortener</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">{user.name}</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Shorten a URL</CardTitle>
            <CardDescription>
              Enter a long URL below to create a shortened version
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleShortenUrl} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="url">URL to shorten</Label>
                <Input
                  id="url"
                  type="url"
                  placeholder="https://example.com/very-long-url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customUrl">Custom URL (optional)</Label>
                <Input
                  id="customUrl"
                  type="text"
                  placeholder="my-custom-link"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                />
              </div>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? "Shortening..." : "Shorten URL"}
              </Button>
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Your Shortened URLs</span>
            </CardTitle>
            <CardDescription>
              Manage and track your shortened URLs
            </CardDescription>
          </CardHeader>
          <CardContent>
            {shortenedUrls.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Link2 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No shortened URLs yet. Create your first one above!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {shortenedUrls.map((item) => (
                  <div
                    key={item.id}
                    className="border rounded-lg p-4 space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="secondary" className="text-xs">
                            {item.clicks} clicks
                          </Badge>
                          <span className="text-xs text-gray-500">
                            Created {item.createdAt}
                          </span>
                          {item.customUrl && (
                            <Badge variant="outline" className="text-xs">
                              Custom
                            </Badge>
                          )}
                          {item.lastClicked && (
                            <span className="text-xs text-gray-500">
                              Last clicked:{" "}
                              {new Date(item.lastClicked).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                        <div className="space-y-2">
                          <div>
                            <p className="text-sm font-medium text-gray-900 mb-1">
                              Short URL:
                            </p>
                            <div className="flex items-center space-x-2">
                              <code className="text-sm bg-gray-100 px-2 py-1 rounded flex-1 min-w-0 truncate">
                                {item.shortUrl}
                              </code>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  copyToClipboard(item.shortUrl, item.id)
                                }
                              >
                                {copiedId === item.id ? (
                                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                                ) : (
                                  <Copy className="h-4 w-4" />
                                )}
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleOpenUrl(item.shortCode)}
                              >
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900 mb-1">
                              Original URL:
                            </p>
                            <p className="text-sm text-gray-600 truncate">
                              {item.originalUrl}
                            </p>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteUrl(item.id)}
                        disabled={isDeleting === item.id}
                        className="ml-4 text-red-600 hover:text-red-700"
                      >
                        {isDeleting === item.id ? (
                          <div className="animate-spin h-4 w-4 border-2 border-red-600 border-t-transparent rounded-full" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
