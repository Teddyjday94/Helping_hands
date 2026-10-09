param(
  [Parameter(Mandatory = $true)]
  [string]$ThumbStartSource,
  [Parameter(Mandatory = $true)]
  [string]$ThumbMidSource,
  [Parameter(Mandatory = $true)]
  [string]$TallGrassSource,
  [Parameter(Mandatory = $true)]
  [string]$CutGrassSource
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$drawingDirectory = Split-Path ([System.Drawing.Bitmap].Assembly.Location)
$drawingReferences = @(
  [System.Drawing.Bitmap].Assembly.Location,
  [System.Drawing.Color].Assembly.Location,
  (Join-Path $drawingDirectory 'System.Runtime.dll'),
  (Join-Path $drawingDirectory 'System.Private.Windows.Core.dll'),
  (Join-Path $drawingDirectory 'System.Private.Windows.GdiPlus.dll')
)

if (-not ('HelpingHands.AssetPrep' -as [type])) {
  Add-Type -TypeDefinition @'
using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;

namespace HelpingHands {
  public static class AssetPrep {
    private static bool IsBackground(Color color) {
      int max = Math.Max(color.R, Math.Max(color.G, color.B));
      int min = Math.Min(color.R, Math.Min(color.G, color.B));
      return color.A == 0 || (max - min <= 26 && min >= 108);
    }

    public static Bitmap ClearEdgeBackground(string path) {
      using (var source = new Bitmap(path)) {
        var bitmap = new Bitmap(source.Width, source.Height, PixelFormat.Format32bppArgb);
        using (var graphics = Graphics.FromImage(bitmap)) {
          graphics.DrawImageUnscaled(source, 0, 0);
        }

        int width = bitmap.Width;
        int height = bitmap.Height;
        var visited = new bool[width * height];
        var queue = new int[width * height];
        int head = 0;
        int tail = 0;

        for (int x = 0; x < width; x++) {
          int topIndex = x;
          int bottomIndex = (height - 1) * width + x;
          if (!visited[topIndex]) { visited[topIndex] = true; queue[tail++] = topIndex; }
          if (!visited[bottomIndex]) { visited[bottomIndex] = true; queue[tail++] = bottomIndex; }
        }
        for (int y = 1; y < height - 1; y++) {
          int leftIndex = y * width;
          int rightIndex = y * width + width - 1;
          if (!visited[leftIndex]) { visited[leftIndex] = true; queue[tail++] = leftIndex; }
          if (!visited[rightIndex]) { visited[rightIndex] = true; queue[tail++] = rightIndex; }
        }

        while (head < tail) {
          int index = queue[head++];
          int x = index % width;
          int y = index / width;
          Color color = bitmap.GetPixel(x, y);
          if (!IsBackground(color)) continue;

          bitmap.SetPixel(x, y, Color.Transparent);
          int neighbor;
          if (x > 0) { neighbor = index - 1; if (!visited[neighbor]) { visited[neighbor] = true; queue[tail++] = neighbor; } }
          if (x + 1 < width) { neighbor = index + 1; if (!visited[neighbor]) { visited[neighbor] = true; queue[tail++] = neighbor; } }
          if (y > 0) { neighbor = index - width; if (!visited[neighbor]) { visited[neighbor] = true; queue[tail++] = neighbor; } }
          if (y + 1 < height) { neighbor = index + width; if (!visited[neighbor]) { visited[neighbor] = true; queue[tail++] = neighbor; } }
        }

        return bitmap;
      }
    }

    private static Rectangle AlphaBounds(Bitmap bitmap) {
      int left = bitmap.Width;
      int top = bitmap.Height;
      int right = -1;
      int bottom = -1;

      for (int y = 0; y < bitmap.Height; y++) {
        for (int x = 0; x < bitmap.Width; x++) {
          if (bitmap.GetPixel(x, y).A == 0) continue;
          left = Math.Min(left, x);
          top = Math.Min(top, y);
          right = Math.Max(right, x);
          bottom = Math.Max(bottom, y);
        }
      }

      if (right < left || bottom < top) throw new InvalidOperationException("No opaque subject pixels found.");
      int padX = Math.Max(4, (right - left + 1) / 50);
      int padY = Math.Max(4, (bottom - top + 1) / 50);
      left = Math.Max(0, left - padX);
      top = Math.Max(0, top - padY);
      right = Math.Min(bitmap.Width - 1, right + padX);
      bottom = Math.Min(bitmap.Height - 1, bottom + padY);
      return Rectangle.FromLTRB(left, top, right + 1, bottom + 1);
    }

    private static void ClearEnclosedNeutralPatches(Bitmap bitmap) {
      var visited = new bool[bitmap.Width * bitmap.Height];
      var queue = new int[bitmap.Width * bitmap.Height];
      int head = 0;
      int tail = 0;

      for (int seedY = 118; seedY <= 174; seedY += 7) {
        for (int seedX = 58; seedX <= 116; seedX += 7) {
          if (seedX >= bitmap.Width || seedY >= bitmap.Height) continue;
          Color seed = bitmap.GetPixel(seedX, seedY);
          if (!IsBackground(seed)) continue;
          int index = seedY * bitmap.Width + seedX;
          if (!visited[index]) { visited[index] = true; queue[tail++] = index; }
        }
      }

      while (head < tail) {
        int index = queue[head++];
        int x = index % bitmap.Width;
        int y = index / bitmap.Width;
        Color color = bitmap.GetPixel(x, y);
        if (!IsBackground(color)) continue;
        bitmap.SetPixel(x, y, Color.Transparent);
        int neighbor;
        if (x > 0) { neighbor = index - 1; if (!visited[neighbor]) { visited[neighbor] = true; queue[tail++] = neighbor; } }
        if (x + 1 < bitmap.Width) { neighbor = index + 1; if (!visited[neighbor]) { visited[neighbor] = true; queue[tail++] = neighbor; } }
        if (y > 0) { neighbor = index - bitmap.Width; if (!visited[neighbor]) { visited[neighbor] = true; queue[tail++] = neighbor; } }
        if (y + 1 < bitmap.Height) { neighbor = index + bitmap.Width; if (!visited[neighbor]) { visited[neighbor] = true; queue[tail++] = neighbor; } }
      }
    }

    private static void RemoveSmallOpaqueComponents(Bitmap bitmap, int minimumPixels) {
      int width = bitmap.Width;
      int height = bitmap.Height;
      var visited = new bool[width * height];
      var queue = new int[width * height];
      var component = new int[width * height];

      for (int start = 0; start < width * height; start++) {
        if (visited[start]) continue;
        visited[start] = true;
        int startX = start % width;
        int startY = start / width;
        if (bitmap.GetPixel(startX, startY).A == 0) continue;

        int head = 0;
        int tail = 0;
        int count = 0;
        queue[tail++] = start;
        while (head < tail) {
          int index = queue[head++];
          component[count++] = index;
          int x = index % width;
          int y = index / width;

          for (int offsetY = -1; offsetY <= 1; offsetY++) {
            for (int offsetX = -1; offsetX <= 1; offsetX++) {
              if (offsetX == 0 && offsetY == 0) continue;
              int nextX = x + offsetX;
              int nextY = y + offsetY;
              if (nextX < 0 || nextY < 0 || nextX >= width || nextY >= height) continue;
              int next = nextY * width + nextX;
              if (visited[next]) continue;
              visited[next] = true;
              if (bitmap.GetPixel(nextX, nextY).A > 0) queue[tail++] = next;
            }
          }
        }

        if (count >= minimumPixels) continue;
        for (int index = 0; index < count; index++) {
          int pixel = component[index];
          bitmap.SetPixel(pixel % width, pixel / width, Color.Transparent);
        }
      }
    }

    public static void MakeSprite(string sourcePath, string outputPath) {
      using (var source = ClearEdgeBackground(sourcePath)) {
        Rectangle bounds = AlphaBounds(source);
        using (var output = new Bitmap(303, 222, PixelFormat.Format32bppArgb)) {
          using (var graphics = Graphics.FromImage(output)) {
            graphics.Clear(Color.Transparent);
            graphics.CompositingMode = CompositingMode.SourceCopy;
            graphics.InterpolationMode = InterpolationMode.HighQualityBicubic;
            graphics.PixelOffsetMode = PixelOffsetMode.HighQuality;

            double scale = Math.Min(295.0 / bounds.Width, 214.0 / bounds.Height);
            int width = Math.Max(1, (int)Math.Round(bounds.Width * scale));
            int height = Math.Max(1, (int)Math.Round(bounds.Height * scale));
            int x = (303 - width) / 2;
            int y = 222 - height - 3;
            graphics.DrawImage(source, new Rectangle(x, y, width, height), bounds, GraphicsUnit.Pixel);
          }

          ClearEnclosedNeutralPatches(output);
          RemoveSmallOpaqueComponents(output, 12);
          output.Save(outputPath, ImageFormat.Png);
        }
      }
    }

    private static Rectangle GreenBounds(Bitmap bitmap) {
      int left = bitmap.Width;
      int top = bitmap.Height;
      int right = -1;
      int bottom = -1;
      for (int y = 0; y < bitmap.Height; y++) {
        for (int x = 0; x < bitmap.Width; x++) {
          Color color = bitmap.GetPixel(x, y);
          if (color.A == 0 || color.G < color.R + 10 || color.G < color.B + 6) continue;
          left = Math.Min(left, x);
          top = Math.Min(top, y);
          right = Math.Max(right, x);
          bottom = Math.Max(bottom, y);
        }
      }
      if (right < left || bottom < top) throw new InvalidOperationException("No green grass pixels found.");
      return Rectangle.FromLTRB(left, top, right + 1, bottom + 1);
    }

    public static void MakeGrass(string sourcePath, string outputPath, int renderedHeight) {
      using (var source = ClearEdgeBackground(sourcePath)) {
        Rectangle bounds = GreenBounds(source);
        int sampleWidth = Math.Max(1, bounds.Width / 2);
        var sample = new Rectangle(bounds.Left + (bounds.Width - sampleWidth) / 2, bounds.Top, sampleWidth, bounds.Height);

        using (var half = new Bitmap(256, renderedHeight, PixelFormat.Format32bppArgb))
        using (var output = new Bitmap(512, 72, PixelFormat.Format32bppArgb)) {
          using (var graphics = Graphics.FromImage(half)) {
            graphics.Clear(Color.Transparent);
            graphics.CompositingMode = CompositingMode.SourceCopy;
            graphics.InterpolationMode = InterpolationMode.HighQualityBicubic;
            graphics.DrawImage(source, new Rectangle(0, 0, 256, renderedHeight), sample, GraphicsUnit.Pixel);
          }

          using (var mirror = (Bitmap)half.Clone()) {
            mirror.RotateFlip(RotateFlipType.RotateNoneFlipX);
            using (var graphics = Graphics.FromImage(output)) {
              graphics.Clear(Color.Transparent);
              graphics.CompositingMode = CompositingMode.SourceCopy;
              int y = output.Height - renderedHeight;
              graphics.DrawImageUnscaled(half, 0, y);
              graphics.DrawImageUnscaled(mirror, 256, y);
            }
          }

          RemoveSmallOpaqueComponents(output, 6);
          output.Save(outputPath, ImageFormat.Png);
        }
      }
    }
  }
}
'@ -ReferencedAssemblies $drawingReferences
}

$assetDirectory = (Resolve-Path (Join-Path $PSScriptRoot '..\assets')).Path
[HelpingHands.AssetPrep]::MakeSprite(
  (Resolve-Path $ThumbStartSource).Path,
  (Join-Path $assetDirectory 'mower-sprite-thumb-start-v1.png')
)
[HelpingHands.AssetPrep]::MakeSprite(
  (Resolve-Path $ThumbMidSource).Path,
  (Join-Path $assetDirectory 'mower-sprite-thumb-mid-v1.png')
)
[HelpingHands.AssetPrep]::MakeGrass(
  (Resolve-Path $TallGrassSource).Path,
  (Join-Path $assetDirectory 'grass-uncut-sprite-v1.png'),
  64
)
[HelpingHands.AssetPrep]::MakeGrass(
  (Resolve-Path $CutGrassSource).Path,
  (Join-Path $assetDirectory 'grass-cut-sprite-v1.png'),
  24
)

Write-Output 'Prepared the two in-between mower poses and both grass sprites.'
