# SEED Backend Setup Script
# Run this from the backend/ directory

param(
  [switch]$Install = $true,
  [switch]$Seed = $true,
  [switch]$Run = $true
)

$BackendDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location -LiteralPath $BackendDir

Write-Host "🚀 SEED Backend Setup" -ForegroundColor Cyan
Write-Host "========================" -ForegroundColor Cyan

# 1. Install dependencies
if ($Install) {
  Write-Host "`n📦 Installing dependencies..." -ForegroundColor Yellow
  npm install
  if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ npm install failed" -ForegroundColor Red
    exit 1
  }
  Write-Host "✅ Dependencies installed" -ForegroundColor Green
}

# 2. Generate Prisma client
Write-Host "`n🔧 Generating Prisma client..." -ForegroundColor Yellow
npx prisma generate
if ($LASTEXITCODE -ne 0) {
  Write-Host "❌ Prisma generate failed" -ForegroundColor Red
  exit 1
}
Write-Host "✅ Prisma client generated" -ForegroundColor Green

# 3. Push schema to database
Write-Host "`n🗄️  Pushing schema to database..." -ForegroundColor Yellow
npx prisma db push
if ($LASTEXITCODE -ne 0) {
  Write-Host "❌ Database push failed. Make sure PostgreSQL is running and DATABASE_URL is correct in .env" -ForegroundColor Red
  exit 1
}
Write-Host "✅ Schema pushed" -ForegroundColor Green

# 4. Seed database
if ($Seed) {
  Write-Host "`n🌱 Seeding database..." -ForegroundColor Yellow
  npx prisma db seed
  if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Seed may have partially failed - check output above" -ForegroundColor Yellow
  } else {
    Write-Host "✅ Database seeded" -ForegroundColor Green
  }
}

# 5. Run dev server
if ($Run) {
  Write-Host "`n🔥 Starting development server..." -ForegroundColor Yellow
  Write-Host "   API: http://localhost:3001" -ForegroundColor Cyan
  Write-Host "   Health: http://localhost:3001/health" -ForegroundColor Cyan
  npm run dev
}

Write-Host "`n✅ Setup complete!" -ForegroundColor Green