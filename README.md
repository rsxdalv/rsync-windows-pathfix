# rsync-windows-pathfix

Fix rsync PATH on Windows by adding the Chocolatey rsync bin directory to your `PATH`.

## Usage

The CLI now supports separate actions for updating the current session and persisting the PATH change.

```powershell
# Update the current PowerShell session only (no registry changes)
npx github:rsxdalv/rsync-windows-pathfix --fixSession

# Persist the rsync path to your user PATH (registry) for new sessions
npx github:rsxdalv/rsync-windows-pathfix --persist

```

### Update the current PowerShell session

To apply the PATH change in your current terminal session without reopening it, run:

```powershell
Invoke-Expression (npx github:rsxdalv/rsync-windows-pathfix --fixSession)
```

This is equivalent to running:

```powershell
$env:Path = "C:\ProgramData\chocolatey\lib\rsync\tools\bin;$env:Path"
```