# rsync-windows-pathfix

Fix rsync PATH on Windows by adding the Chocolatey rsync bin directory to your `PATH`.

## Usage

```powershell
npx github:rsxdalv/rsync-windows-pathfix --fixPath
```

This will:
1. Permanently add `C:\ProgramData\chocolatey\lib\rsync\tools\bin` to your user-level `PATH` in the Windows registry.
2. Print the PowerShell command to update your current session immediately.

### Update the current PowerShell session

To apply the PATH change in your current terminal session without reopening it, run:

```powershell
Invoke-Expression (npx github:rsxdalv/rsync-windows-pathfix --fixPath)
```

This is equivalent to running:

```powershell
$env:Path = "C:\ProgramData\chocolatey\lib\rsync\tools\bin;$env:Path"
```