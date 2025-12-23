"use client";

import { PhotoUpload } from "@/components/headshots";
import HeadshotGallery from "@/components/headshots/headshot-gallery";
import { StyleSelector } from "@/components/headshots/style-selector";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/lib/context/user-context";
import {
  useDeleteHeadshot,
  useGenerateHeadshot,
  useHeadshots,
  useHeadshotStyles,
} from "@/lib/hooks/useHeadshots";
import { HeadshotStyle } from "@/lib/types";
import { Loader2, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const HeadshotsPage = () => {
  const { user } = useUser();

  // Upload state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedStyles, setSelectedStyles] = useState<HeadshotStyle[]>([]);
  const [customPrompt, setCustomPrompt] = useState<string>("");

  // TanStack Query hooks
  const { data: stylesData } = useHeadshotStyles();
  const { data: headshotsData, isLoading: isLoadingHeadshots } = useHeadshots({
    limit: 10,
    offset: 0,
  });
  const { mutate: generateHeadshotMutation, isPending: isGenerating } =
    useGenerateHeadshot();
    const { mutate: deleteHeadshotMutation, isPending } = useDeleteHeadshot();

  const handleUpload = () => {
    if (!selectedFile) {
      toast.error("Please select a photo");
      return;
    }
    if (selectedStyles.length === 0 && !customPrompt.trim()) {
      toast.error("Please select at least one style");
      return;
    }

    generateHeadshotMutation(
      {
        photo: selectedFile,
        styles: selectedStyles,
        prompt: customPrompt.trim(),
      },

      {
        onSuccess: () => {
          toast.success("Headshot generated successfully");
          setSelectedFile(null);
          setSelectedStyles([]);
          setCustomPrompt("");
        },
        onError: (error: any) => {
          const message =
            error.response?.data?.message || "Failed to generate headshot";
          toast.error(message);
        },
      }
    );
  };

  const handleDelete = (id: string) => {
    deleteHeadshotMutation(id, {
      onSuccess: () => {
        toast.success("Headshot deleted successfully");
      },
      onError: (error: any) => {
        toast.error("Failed to delete headshot");
      },
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">AI Headshots</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Upload a photo and get professional headshots in different styles
        </p>
      </div>

      {/* Upload Section */}
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="mb-6 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">
            Generate Headshots
          </h2>
        </div>

        <div className="space-y-6">
          {/* Photo Upload */}
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Upload Your Photo
            </label>
            <PhotoUpload
              onUploadSuccess={setSelectedFile}
              onUploadError={(error: string) => toast.error(error)}
            />
          </div>

          {/* Style Selection */}
          {stylesData && stylesData?.length > 0 && (
            <div>
              <StyleSelector
                selectedStyles={selectedStyles}
                onStylesChange={setSelectedStyles}
                maxStyles={5}
                availableStyles={stylesData}
              />
            </div>
          )}

          {/* Custom Prompt (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="custom-prompt">Custom Prompt (Optional)</Label>
            <Textarea
              id="custom-prompt"
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="Enter a custom prompt to override the default style prompts. If left empty, default prompts will be used."
              rows={3}
            />
            <p className="text-xs text-muted-foreground">
              Leave empty to use default style prompts, or enter a custom prompt
              to apply to all selected styles
            </p>
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleUpload}
            disabled={
              !selectedFile ||
              (selectedStyles.length === 0 && !customPrompt.trim()) ||
              isLoadingHeadshots
            }
            className="w-full"
            size="lg"
          >
            {isLoadingHeadshots ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Headshots
              </>
            )}
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Generation typically takes 2-5 minutes
          </p>
        </div>
      </div>

      {/* Headshots Gallery */}

      <div>
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          Your Headshots
        </h2>
        <HeadshotGallery
          headshots={headshotsData?.headshots || []}
          isLoading={isLoadingHeadshots}
          onDelete={handleDelete}
          hasMore={false}
        />
      </div>
    </div>
  );
};

export default HeadshotsPage;
