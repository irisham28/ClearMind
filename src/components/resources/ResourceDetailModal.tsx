import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import { ExternalLink, CheckCircle2 } from "lucide-react";

interface ResourceContent {
  overview: string;
  keyPoints: string[];
  actionSteps: string[];
  externalLink?: {
    url: string;
    label: string;
  };
}

interface ResourceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  icon: ReactNode;
  title: string;
  description: string;
  tag: string;
  content: ResourceContent;
}

export function ResourceDetailModal({
  isOpen,
  onClose,
  icon,
  title,
  description,
  tag,
  content,
}: ResourceDetailModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary shrink-0">
              {icon}
            </div>
            <div>
              <span className="inline-block text-[10px] font-medium uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded mb-1">
                {tag}
              </span>
              <DialogTitle className="text-lg">{title}</DialogTitle>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Overview */}
          <div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {content.overview}
            </p>
          </div>

          {/* Key Points */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Key Points
            </h4>
            <ul className="space-y-2">
              {content.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Steps */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Action Steps
            </h4>
            <ol className="space-y-2">
              {content.actionSteps.map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-secondary text-secondary-foreground text-xs font-medium shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-sm text-foreground pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* External Link */}
          {content.externalLink && (
            <Button
              variant="outline"
              className="w-full"
              asChild
            >
              <a
                href={content.externalLink.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {content.externalLink.label}
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
