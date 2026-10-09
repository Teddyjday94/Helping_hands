param(
  [Parameter(Mandatory = $true)]
  [string]$Path,
  [int]$SeedX = 78,
  [int]$SeedY = 135,
  [int]$MaximumColorDistance = 75,
  [int]$MinimumChannelValue = 0
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$resolvedPath = (Resolve-Path $Path).Path
$bitmap = [System.Drawing.Bitmap]::new($resolvedPath)
$seed = $bitmap.GetPixel($SeedX, $SeedY)
$visited = [System.Collections.Generic.HashSet[string]]::new()
$background = [System.Collections.Generic.List[object]]::new()
$queue = [System.Collections.Queue]::new()
$queue.Enqueue([int[]]@($SeedX, $SeedY))

while ($queue.Count -gt 0) {
  $point = [int[]]$queue.Dequeue()
  $x = [int]$point[0]
  $y = [int]$point[1]
  $key = "$x,$y"

  if (-not $visited.Add($key)) { continue }
  if ($x -lt 0 -or $y -lt 0 -or $x -ge $bitmap.Width -or $y -ge $bitmap.Height) { continue }

  $pixel = $bitmap.GetPixel($x, $y)
  $maximum = [Math]::Max($pixel.R, [Math]::Max($pixel.G, $pixel.B))
  $minimum = [Math]::Min($pixel.R, [Math]::Min($pixel.G, $pixel.B))
  $channelSpread = $maximum - $minimum
  $distance = [Math]::Abs($pixel.R - $seed.R) + [Math]::Abs($pixel.G - $seed.G) + [Math]::Abs($pixel.B - $seed.B)

  if (
    $pixel.A -eq 0 -or
    $channelSpread -gt 18 -or
    $distance -gt $MaximumColorDistance -or
    $minimum -lt $MinimumChannelValue
  ) { continue }

  $background.Add([int[]]@($x, $y))
  $queue.Enqueue([int[]]@(($x - 1), $y))
  $queue.Enqueue([int[]]@(($x + 1), $y))
  $queue.Enqueue([int[]]@($x, ($y - 1)))
  $queue.Enqueue([int[]]@($x, ($y + 1)))
}

foreach ($point in $background) {
  $pixel = $bitmap.GetPixel($point[0], $point[1])
  $bitmap.SetPixel($point[0], $point[1], [System.Drawing.Color]::FromArgb(0, $pixel.R, $pixel.G, $pixel.B))
}

$temporaryPath = "$resolvedPath.cleaned.png"
$bitmap.Save($temporaryPath, [System.Drawing.Imaging.ImageFormat]::Png)
$bitmap.Dispose()
Move-Item -LiteralPath $temporaryPath -Destination $resolvedPath -Force

Write-Output "Cleared $($background.Count) enclosed background pixels from $Path"
