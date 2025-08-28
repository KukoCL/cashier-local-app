# Script temporal para probar falla de coverage

Write-Host "=== Ejecutando pruebas unitarias del backend ===" -ForegroundColor Cyan
Write-Host ""

# Limpiar reportes anteriores
if (Test-Path "TestResults") {
    Remove-Item -Recurse -Force "TestResults"
}

# Ejecutar pruebas con cobertura
Write-Host "Ejecutando pruebas con cobertura..." -ForegroundColor Yellow
Write-Host ""

dotnet test Tests/Tests.csproj --collect:"XPlat Code Coverage" --results-directory TestResults --settings Tests/coverlet.runsettings --verbosity normal

if ($LASTEXITCODE -ne 0) {
    Write-Host "Las pruebas fallaron" -ForegroundColor Red
    exit $LASTEXITCODE
}

# Buscar el archivo de cobertura generado
$coverageFile = Get-ChildItem -Path "TestResults" -Recurse -Filter "coverage.cobertura.xml" | Select-Object -First 1

if (-not $coverageFile) {
    Write-Host "No se encontró el archivo de cobertura" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "=== Generando reporte de cobertura ===" -ForegroundColor Cyan

# Generar reporte HTML
reportgenerator -reports:"$($coverageFile.FullName)" -targetdir:"TestResults/Coverage" -reporttypes:"Html;TextSummary" -verbosity:Warning

Write-Host ""
Write-Host "=== RESUMEN DE COBERTURA ===" -ForegroundColor Green
Write-Host ""

# Leer y mostrar el resumen
$summaryFile = "TestResults/Coverage/Summary.txt"
if (Test-Path $summaryFile) {
    $content = Get-Content $summaryFile
    
    Write-Host "Métricas de Cobertura:" -ForegroundColor Cyan
    $failed = $false
    
    foreach ($line in $content) {
        if ($line -match "Line coverage:|Branch coverage:|Method coverage:") {
            Write-Host "  $line" -ForegroundColor White
            
            # Verificar threshold - usando 95% para forzar falla
            if ($line -match "(\d+\.?\d+)") {
                $percent = [double]$matches[1]
                $metric = $line.Split(":")[0].Trim()
                
                if ($percent -ge 95) {
                    Write-Host "    PASS $metric" -ForegroundColor Green
                } else {
                    Write-Host "    FAIL $metric (requiere 95%)" -ForegroundColor Red
                    $failed = $true
                }
            }
        }
    }
    
    if ($failed) {
        Write-Host ""
        Write-Host "ERROR: El coverage no cumple con el umbral mínimo del 95%" -ForegroundColor Red
        Write-Host "El pipeline debe fallar" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "Threshold requerido: 95%" -ForegroundColor Yellow
Write-Host ""
Write-Host "Reporte HTML: TestResults/Coverage/index.html" -ForegroundColor Cyan
Write-Host ""
Write-Host "=== Pruebas de backend completadas ===" -ForegroundColor Cyan
