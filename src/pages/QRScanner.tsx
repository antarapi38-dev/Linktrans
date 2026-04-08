import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";
import { ArrowLeft, Image as ImageIcon, Flashlight, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function QRScanner() {
  const navigate = useNavigate();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scannedResult, setScannedResult] = useState<string | null>(null);
  const [isFlashOn, setIsFlashOn] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let isMounted = true;
    
    const startScanner = async () => {
      try {
        const html5QrCode = new Html5Qrcode("qr-reader", {
          formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
          verbose: false
        });
        scannerRef.current = html5QrCode;

        await html5QrCode.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1.0,
          },
          (decodedText) => {
            if (isMounted) {
              html5QrCode.stop().catch(console.error);
              navigate('/ongoing');
            }
          },
          (errorMessage) => {
            // Ignore scan errors as they happen constantly when no QR is in view
          }
        );
        if (isMounted) setHasPermission(true);
      } catch (err) {
        console.error("Error starting scanner:", err);
        if (isMounted) setHasPermission(false);
      }
    };

    startScanner();

    return () => {
      isMounted = false;
      if (scannerRef.current && scannerRef.current.isScanning) {
        scannerRef.current.stop().catch(console.error);
      }
    };
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (scannerRef.current) {
        try {
          // Stop camera scanning if active
          if (scannerRef.current.isScanning) {
            await scannerRef.current.stop();
          }
          
          const decodedText = await scannerRef.current.scanFile(file, true);
          navigate('/ongoing');
        } catch (err) {
          console.error("Error scanning file:", err);
          alert("Could not find a valid QR code in the image.");
          
          // Restart camera scanner
          window.location.reload();
        }
      }
    }
  };

  const toggleFlash = async () => {
    if (scannerRef.current && scannerRef.current.isScanning) {
      try {
        const track = scannerRef.current.getRunningTrackCameraCapabilities();
        // Note: Torch control is not universally supported in browsers
        if (track && 'torch' in track) {
          await scannerRef.current.applyVideoConstraints({
            advanced: [{ torch: !isFlashOn } as any]
          });
          setIsFlashOn(!isFlashOn);
        } else {
          alert("Flash is not supported on this device/browser.");
        }
      } catch (err) {
        console.error("Error toggling flash:", err);
      }
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (false) { // Disable the old success screen
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm text-center space-y-6">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Scan Successful</h2>
            <p className="text-gray-500 text-sm break-all bg-gray-100 p-3 rounded-lg">{scannedResult}</p>
          </div>
          <div className="pt-4 space-y-3">
            <Button className="w-full h-12 rounded-full text-lg" onClick={() => navigate('/')}>
              Proceed to Payment
            </Button>
            <Button variant="outline" className="w-full h-12 rounded-full text-lg" onClick={() => window.location.reload()}>
              Scan Another
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 z-10 bg-gradient-to-b from-black/80 to-transparent">
        <button onClick={handleBack} className="p-2 bg-black/40 rounded-full backdrop-blur-md">
          <ArrowLeft size={24} />
        </button>
        <h1 className="font-semibold text-lg">Scan QR Code</h1>
        <div className="w-10"></div> {/* Spacer for centering */}
      </div>

      {/* Scanner Area */}
      <div className="flex-1 relative flex flex-col items-center justify-center overflow-hidden">
        {hasPermission === false && (
          <div className="absolute inset-0 flex items-center justify-center bg-black z-20 px-6 text-center">
            <div>
              <p className="text-red-400 mb-4">Camera access denied.</p>
              <p className="text-sm text-gray-400 mb-6">Please enable camera permissions in your browser settings to scan QR codes.</p>
              <Button onClick={() => window.location.reload()} variant="secondary">
                Try Again
              </Button>
            </div>
          </div>
        )}
        
        <div id="qr-reader" className="w-full max-w-md h-full object-cover"></div>
        
        {/* Overlay for scanning area (visual only) */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-64 h-64 border-2 border-primary rounded-3xl relative">
            {/* Corner markers */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-3xl"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-3xl"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-3xl"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-3xl"></div>
            
            {/* Scanning line animation */}
            <div className="absolute top-0 left-0 w-full h-0.5 bg-primary shadow-[0_0_8px_2px_rgba(0,170,19,0.5)] animate-[scan_2s_ease-in-out_infinite]"></div>
          </div>
        </div>
        
        <style>{`
          @keyframes scan {
            0% { top: 0; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
          }
          #qr-reader {
            border: none !important;
          }
          #qr-reader__scan_region {
            background: black;
          }
          #qr-reader__dashboard {
            display: none !important;
          }
          #qr-reader video {
            object-fit: cover !important;
            width: 100% !important;
            height: 100% !important;
          }
        `}</style>
      </div>

      {/* Bottom Controls */}
      <div className="bg-black/90 pb-safe pt-6 px-8 rounded-t-3xl z-10 flex justify-around items-center h-32">
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="flex flex-col items-center space-y-2 text-gray-300 hover:text-white transition-colors"
        >
          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md">
            <ImageIcon size={24} />
          </div>
          <span className="text-xs font-medium">Gallery</span>
        </button>
        
        <input 
          type="file" 
          accept="image/*" 
          className="hidden" 
          ref={fileInputRef}
          onChange={handleFileUpload}
        />

        <div className="flex flex-col items-center space-y-2 text-primary">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center border border-primary/50">
            <QrCode size={32} />
          </div>
          <span className="text-xs font-medium">Scan QR</span>
        </div>

        <button 
          onClick={toggleFlash}
          className={`flex flex-col items-center space-y-2 transition-colors ${isFlashOn ? 'text-yellow-400' : 'text-gray-300 hover:text-white'}`}
        >
          <div className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md ${isFlashOn ? 'bg-yellow-400/20' : 'bg-white/10'}`}>
            <Flashlight size={24} />
          </div>
          <span className="text-xs font-medium">Flash</span>
        </button>
      </div>
    </div>
  );
}
