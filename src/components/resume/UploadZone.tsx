import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, CheckCircle, FileText } from "lucide-react";
import { motion } from "framer-motion";

interface UploadZoneProps {
    onFileSelect: (file: File) => void;
    isAnalyzing: boolean;
}

export function UploadZone({ onFileSelect, isAnalyzing }: UploadZoneProps) {
    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            if (acceptedFiles.length > 0) {
                onFileSelect(acceptedFiles[0]);
            }
        },
        [onFileSelect]
    );

    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
        onDrop,
        accept: {
            "application/pdf": [".pdf"],
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
        },
        maxFiles: 1,
        disabled: isAnalyzing,
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div
                {...getRootProps()}
                className={`
          border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all
          ${isDragActive ? "border-primary bg-primary/10" : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50"}
          ${isAnalyzing ? "pointer-events-none opacity-50" : ""}
        `}
            >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="p-4 bg-muted rounded-full">
                        {acceptedFiles.length > 0 ? (
                            <CheckCircle className="h-10 w-10 text-green-500" />
                        ) : (
                            <UploadCloud className="h-10 w-10 text-muted-foreground" />
                        )}
                    </div>
                    <div className="space-y-2">
                        <p className="text-xl font-medium">
                            {isDragActive ? "Drop your resume here" : "Drag & drop your resume"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Supports PDF and DOCX formats (Max 5MB)
                        </p>
                    </div>
                    {acceptedFiles.length > 0 && (
                        <div className="mt-4 flex items-center gap-2 p-2 bg-background rounded border text-sm text-primary">
                            <FileText className="h-4 w-4" />
                            {acceptedFiles[0].name}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
