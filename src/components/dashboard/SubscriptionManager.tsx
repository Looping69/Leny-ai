import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, X, Brain, Shield, Zap, CreditCard } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface SubscriptionManagerProps {
  currentPlan?: "free" | "premium";
  onUpgrade?: (plan: string) => void;
  onCancel?: () => void;
}

const SubscriptionManager = ({
  currentPlan = "free",
  onUpgrade = () => {},
  onCancel = () => {},
}: SubscriptionManagerProps) => {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("monthly");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpgrade = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowUpgradeModal(false);
      onUpgrade(selectedPlan);
    }, 2000);
  };

  return (
    <>
      <Card className="bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden">
        <CardHeader className="bg-white border-b border-gray-100 p-4">
          <CardTitle className="text-xl font-semibold text-gray-900">
            Subscription Plan
          </CardTitle>
          <CardDescription className="text-gray-500">
            Manage your subscription and billing information
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Free Plan */}
            <div
              className={`border rounded-xl p-6 ${currentPlan === "free" ? "border-blue-300 bg-blue-50" : "border-gray-200"}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Free Plan
                  </h3>
                  <p className="text-sm text-gray-500">
                    Basic access to AI medical assistants
                  </p>
                </div>
                {currentPlan === "free" && (
                  <Badge
                    variant="outline"
                    className="bg-blue-100 text-blue-700 border-blue-200"
                  >
                    Current Plan
                  </Badge>
                )}
              </div>

              <div className="mb-6">
                <div className="text-3xl font-bold text-gray-900 mb-1">$0</div>
                <div className="text-sm text-gray-500">Forever free</div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">
                    Access to Central AI Orchestrator
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">
                    Up to 3 specialist AI agents
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">
                    Basic patient management
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <X className="h-5 w-5 text-gray-300 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-400">
                    Premium specialist AI agents
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <X className="h-5 w-5 text-gray-300 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-400">
                    Advanced collaboration features
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <X className="h-5 w-5 text-gray-300 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-400">
                    Priority support
                  </span>
                </div>
              </div>

              {currentPlan === "free" ? (
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => setShowUpgradeModal(true)}
                >
                  Upgrade to Premium
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => onCancel()}
                >
                  Downgrade
                </Button>
              )}
            </div>

            {/* Premium Plan */}
            <div
              className={`border rounded-xl p-6 ${currentPlan === "premium" ? "border-indigo-300 bg-indigo-50" : "border-gray-200"}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Premium Plan
                  </h3>
                  <p className="text-sm text-gray-500">
                    Full access to all AI medical assistants
                  </p>
                </div>
                {currentPlan === "premium" && (
                  <Badge
                    variant="outline"
                    className="bg-indigo-100 text-indigo-700 border-indigo-200"
                  >
                    Current Plan
                  </Badge>
                )}
              </div>

              <div className="mb-6">
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  $49<span className="text-lg font-normal">/month</span>
                </div>
                <div className="text-sm text-gray-500">
                  Billed monthly or $499/year
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">
                    Everything in Free plan
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">
                    <span className="font-medium">Unlimited</span> specialist AI
                    agents
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">
                    Advanced AI collaboration features
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">
                    Detailed consensus analysis
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">
                    Priority support
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">
                    HIPAA-compliant data storage
                  </span>
                </div>
              </div>

              {currentPlan === "premium" ? (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => onCancel()}
                >
                  Manage Subscription
                </Button>
              ) : (
                <Button
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                  onClick={() => setShowUpgradeModal(true)}
                >
                  Upgrade Now
                </Button>
              )}
            </div>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">
                  HIPAA & GDPR Compliant
                </h4>
                <p className="text-xs text-gray-500">
                  All plans include end-to-end encryption and comply with
                  healthcare regulations. Your patient data is always secure and
                  private.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upgrade Modal */}
      <Dialog open={showUpgradeModal} onOpenChange={setShowUpgradeModal}>
        <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-white rounded-xl">
          <DialogHeader className="p-6 pb-2">
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <Zap className="h-5 w-5 text-indigo-600" />
              Upgrade to Premium
            </DialogTitle>
            <DialogDescription>
              Get unlimited access to all specialist AI agents and advanced
              features.
            </DialogDescription>
          </DialogHeader>

          <div className="p-6 pt-2 space-y-6">
            <RadioGroup
              value={selectedPlan}
              onValueChange={setSelectedPlan}
              className="space-y-4"
            >
              <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                <RadioGroupItem value="monthly" id="monthly" />
                <Label htmlFor="monthly" className="flex-1 cursor-pointer">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Monthly Plan</div>
                      <div className="text-sm text-gray-500">$49 per month</div>
                    </div>
                    <div className="text-lg font-bold">$49</div>
                  </div>
                </Label>
              </div>

              <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50 relative overflow-hidden">
                <div className="absolute -right-8 top-0 bg-green-500 text-white text-xs px-8 py-1 rotate-45 transform translate-y-2">
                  Save 15%
                </div>
                <RadioGroupItem value="annual" id="annual" />
                <Label htmlFor="annual" className="flex-1 cursor-pointer">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Annual Plan</div>
                      <div className="text-sm text-gray-500">
                        $499 per year (2 months free)
                      </div>
                    </div>
                    <div className="text-lg font-bold">$499</div>
                  </div>
                </Label>
              </div>
            </RadioGroup>

            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-600">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="h-4 w-4 text-gray-500" />
                <span className="font-medium">Secure Payment</span>
              </div>
              <p>
                Your payment information is processed securely. We do not store
                credit card details.
              </p>
            </div>
          </div>

          <DialogFooter className="p-6 pt-0">
            <Button
              variant="outline"
              onClick={() => setShowUpgradeModal(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
              onClick={handleUpgrade}
              disabled={isProcessing}
            >
              {isProcessing
                ? "Processing..."
                : `Upgrade to ${selectedPlan === "annual" ? "Annual" : "Monthly"} Plan`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SubscriptionManager;
