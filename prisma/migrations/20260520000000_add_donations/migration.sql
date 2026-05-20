-- CreateTable
CREATE TABLE "Donation" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'usd',
    "frequency" TEXT NOT NULL DEFAULT 'one-time',
    "category" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "donorEmail" TEXT,
    "donorName" TEXT,
    "stripeSessionId" TEXT,
    "stripePaymentIntentId" TEXT,
    "stripeSubscriptionId" TEXT,
    "stripeCustomerId" TEXT,
    "publicRequestId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Donation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Donation_stripeSessionId_key" ON "Donation"("stripeSessionId");

-- CreateIndex
CREATE UNIQUE INDEX "Donation_stripePaymentIntentId_key" ON "Donation"("stripePaymentIntentId");

-- CreateIndex
CREATE INDEX "Donation_publicRequestId_idx" ON "Donation"("publicRequestId");

-- CreateIndex
CREATE INDEX "Donation_stripeSubscriptionId_idx" ON "Donation"("stripeSubscriptionId");

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_publicRequestId_fkey" FOREIGN KEY ("publicRequestId") REFERENCES "PublicRequest"("id") ON DELETE SET NULL ON UPDATE CASCADE;
