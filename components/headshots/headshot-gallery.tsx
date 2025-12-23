"use client";
import { HeadshotGalleryProps } from "@/lib/types";
import { AlertCircle, Download, Loader2, Trash2, X } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";

const HeadshotGallery = ({
  headshots,
  isLoading,
  onLoadMore,
  hasMore,
  onDelete,
}: HeadshotGalleryProps) => {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [viewingImage, setViewingImage] = useState<{
    url: string;
    alt: string;
  } | null>(null);

  const handleDelete = async (id: string) => {
    if (!onDelete) return;

    setDeletingId(id);
    try {
      await onDelete(id);
    } finally {
      setDeletingId(null);
    }
  };

  const handleDownload = (url: string, filename: string) => {
    // <a href={url} download={filename} target="_blank"></a>
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading && headshots.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (headshots.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border p-12 text-center">
        <p className="text-sm text-muted-foreground">
          No headshots yet. Upload a photo to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {headshots.map((headshot) => (
        <div
          key={headshot._id}
          className="rounded-lg border border-border bg-card p-4"
        >
          {/* Header */}
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">
                {new Date(headshot.createdAt).toLocaleDateString()}
              </p>
              <p className="text-xs text-muted-foreground">
                {headshot.selectedStyles.length} style
                {headshot.selectedStyles.length !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {headshot.status === "processing" && (
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Processing
                </span>
              )}
              {headshot.status === "completed" && (
                <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                  Completed
                </span>
              )}
              {headshot.status === "failed" && (
                <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
                  <AlertCircle className="h-3 w-3" />
                  Failed
                </span>
              )}
              {onDelete && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(headshot._id)}
                  disabled={deletingId === headshot._id}
                >
                  {deletingId === headshot._id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* Original Photo */}
          <div className="mb-4">
            <p className="mb-2 text-xs font-medium text-muted-foreground">
              Original Photo
            </p>
            <div
              className="h-32 w-32 cursor-pointer overflow-hidden rounded-md border border-border transition-opacity hover:opacity-80"
              onClick={() =>
                setViewingImage({
                  url: headshot.originalPhotoUrl,
                  alt: "Original Photo",
                })
              }
            >
              <img
                src={headshot.originalPhotoUrl}
                alt="Original"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Generated Headshots */}
          {headshot.generatedHeadshots.length > 0 && (
            <div>
              <p className="mb-3 text-xs font-medium text-muted-foreground">
                Generated Headshots
              </p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {headshot.generatedHeadshots.map((generated, index) => (
                  <div
                    key={index}
                    className="group relative cursor-pointer overflow-hidden rounded-lg border border-border"
                    onClick={() =>
                      setViewingImage({
                        url: generated.url,
                        alt: `${generated.style} headshot`,
                      })
                    }
                  >
                    <div className="aspect-square">
                      <img
                        src={generated.url}
                        alt={generated.style}
                        className="h-full w-full object-cover transition-opacity group-hover:opacity-80"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                      <div className="flex h-full flex-col items-center justify-center gap-2">
                        <p className="text-sm font-medium text-white capitalize">
                          {generated.style}
                        </p>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() =>
                            handleDownload(
                              generated.url,
                              `headshot-${generated.style}-${index + 1}.png`
                            )
                          }
                        >
                          <Download className="h-4 w-4" />
                          <span className="ml-2">Download</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Failed State */}
          {headshot.status === "failed" && headshot.failureReason && (
            <div className="mt-4 rounded-md bg-red-50 p-3">
              <p className="text-xs text-red-700">{headshot.failureReason}</p>
            </div>
          )}
        </div>
      ))}

      {/* Load More */}
      {hasMore && onLoadMore && (
        <div className="text-center">
          <Button variant="outline" onClick={onLoadMore} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              "Load More"
            )}
          </Button>
        </div>
      )}

      {/* Image Viewer Modal */}
      {viewingImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setViewingImage(null)}
        >
          <div className="relative max-h-full max-w-full">
            <button
              onClick={() => setViewingImage(null)}
              className="absolute -right-12 top-0 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
            <img
              src={viewingImage.url}
              alt={viewingImage.alt}
              className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="mt-2 text-center text-sm text-white">
              {viewingImage.alt}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeadshotGallery;
