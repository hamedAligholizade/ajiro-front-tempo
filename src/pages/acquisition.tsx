import React, { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { t } from "@/lib/i18n";
import { Share2, Copy, Facebook, Twitter, Instagram } from "lucide-react";

const prizes = [
  { id: 1, name: "10% Discount", color: "#FF6B6B", probability: 30 },
  { id: 2, name: "Free Coffee", color: "#4ECDC4", probability: 20 },
  { id: 3, name: "Free Delivery", color: "#FFE66D", probability: 15 },
  { id: 4, name: "Buy 1 Get 1 Free", color: "#1A535C", probability: 10 },
  { id: 5, name: "500 Loyalty Points", color: "#FF9F1C", probability: 15 },
  { id: 6, name: "Try Again", color: "#6B717E", probability: 10 },
];

const CustomerAcquisition = () => {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [prize, setPrize] = useState<any>(null);
  const [showPrizeDialog, setShowPrizeDialog] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [referralCode, setReferralCode] = useState(
    "AJIRO-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
  );
  const [codeCopied, setCodeCopied] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);

  const spinWheel = () => {
    if (spinning) return;

    setSpinning(true);
    setPrize(null);

    // Calculate probabilities
    const probabilityArray: number[] = [];
    prizes.forEach((prize) => {
      for (let i = 0; i < prize.probability; i++) {
        probabilityArray.push(prize.id);
      }
    });

    // Select random prize based on probability
    const randomIndex = Math.floor(Math.random() * probabilityArray.length);
    const selectedPrizeId = probabilityArray[randomIndex];
    const selectedPrize = prizes.find((p) => p.id === selectedPrizeId);

    // Calculate rotation
    const prizeIndex = prizes.findIndex((p) => p.id === selectedPrizeId);
    const segmentSize = 360 / prizes.length;
    const targetRotation =
      360 * 5 + (360 - (prizeIndex * segmentSize + segmentSize / 2));

    setRotation(targetRotation);

    setTimeout(() => {
      setSpinning(false);
      setPrize(selectedPrize);
      setShowPrizeDialog(true);
    }, 5000);
  };

  const handleSubmitPhone = () => {
    if (!phoneNumber.trim()) {
      setPhoneError(t("acquisition.phoneRequired"));
      return;
    }

    setPhoneError("");
    // Here you would typically send the phone number to your backend
    // For now, we'll just close the dialog
    setShowPrizeDialog(false);
  };

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  return (
    <div className="container py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t("acquisition.title")}</h1>
      </div>
      <p className="text-muted-foreground">{t("acquisition.subtitle")}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>{t("acquisition.luckyWheel")}</CardTitle>
            <CardDescription>
              {t("acquisition.luckyWheelDescription")}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="relative w-64 h-64 mb-6">
              <div
                ref={wheelRef}
                className="absolute w-full h-full rounded-full border-4 border-primary overflow-hidden transition-transform duration-5000 ease-out"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transition: spinning
                    ? "transform 5s cubic-bezier(0.17, 0.67, 0.12, 0.99)"
                    : "none",
                }}
              >
                {prizes.map((prize, index) => {
                  const segmentSize = 360 / prizes.length;
                  const rotation = index * segmentSize;
                  return (
                    <div
                      key={prize.id}
                      className="absolute w-full h-full origin-center"
                      style={{
                        transform: `rotate(${rotation}deg)`,
                        clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos((segmentSize * Math.PI) / 180)}% ${50 - 50 * Math.sin((segmentSize * Math.PI) / 180)}%, 50% 50%)`,
                      }}
                    >
                      <div
                        className="w-full h-full flex items-center justify-center text-xs font-bold text-white"
                        style={{
                          backgroundColor: prize.color,
                          transform: `rotate(${segmentSize / 2}deg)`,
                        }}
                      >
                        <span className="absolute top-10 left-1/2 transform -translate-x-1/2 rotate-90 whitespace-nowrap">
                          {prize.name}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-8 bg-red-500 clip-triangle z-10"></div>
            </div>
            <Button onClick={spinWheel} disabled={spinning} className="w-40">
              {t("acquisition.spinWheel")}
            </Button>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>{t("acquisition.inviteFriends")}</CardTitle>
            <CardDescription>
              {t("acquisition.shareWithFriends")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>{t("acquisition.referralCode")}</Label>
              <div className="flex">
                <Input
                  value={referralCode}
                  readOnly
                  className="flex-1 rounded-r-none"
                />
                <Button
                  onClick={copyReferralCode}
                  variant="outline"
                  className="rounded-l-none"
                >
                  {codeCopied ? "Copied!" : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="pt-4">
              <Label>{t("acquisition.shareOnSocialMedia")}</Label>
              <div className="flex gap-2 mt-2">
                <Button variant="outline" size="icon">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Instagram className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={showPrizeDialog} onOpenChange={setShowPrizeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {prize?.name === "Try Again"
                ? t("acquisition.tryAgain")
                : t("acquisition.congratulations")}
            </DialogTitle>
            <DialogDescription>
              {prize?.name === "Try Again"
                ? t("acquisition.tryAgain")
                : `${t("acquisition.enterPhone")}: ${prize?.name}`}
            </DialogDescription>
          </DialogHeader>

          {prize?.name !== "Try Again" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">{t("settings.phone")}</Label>
                <Input
                  id="phone"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+98 912 345 6789"
                />
                {phoneError && (
                  <p className="text-sm text-red-500">{phoneError}</p>
                )}
              </div>

              <p className="text-xs text-muted-foreground">
                {t("acquisition.termsAndConditions")}
              </p>
            </div>
          )}

          <DialogFooter>
            {prize?.name === "Try Again" ? (
              <Button onClick={() => setShowPrizeDialog(false)}>
                {t("acquisition.tryAgain")}
              </Button>
            ) : (
              <Button onClick={handleSubmitPhone}>
                {t("acquisition.submit")}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <style jsx>{`
        .clip-triangle {
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }
        .duration-5000 {
          transition-duration: 5000ms;
        }
      `}</style>
    </div>
  );
};

export default CustomerAcquisition;
