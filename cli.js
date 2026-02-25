#!/usr/bin/env node
'use strict';

const { execSync } = require('child_process');

const RSYNC_PATH = 'C:\\ProgramData\\chocolatey\\lib\\rsync\\tools\\bin';
const args = process.argv.slice(2);

if (args.includes('--fixPath')) {
  // Output the PowerShell command for the current session
  const sessionCmd = `$env:Path = "${RSYNC_PATH};$env:Path"`;
  process.stdout.write(sessionCmd + '\n');

  // Also attempt to persist the PATH change to the user environment
  if (process.platform === 'win32') {
    try {
      const psCmd = `[Environment]::SetEnvironmentVariable('Path', '${RSYNC_PATH};' + [Environment]::GetEnvironmentVariable('Path', 'User'), 'User')`;
      execSync(`powershell.exe -NoProfile -Command "${psCmd}"`, { stdio: 'pipe' });
      process.stderr.write('rsync path added to user PATH permanently.\n');
      process.stderr.write('Run the following command to update your current session:\n');
      process.stderr.write(`  ${sessionCmd}\n`);
      process.stderr.write('Or use: Invoke-Expression (npx github:rsxdalv/rsync-windows-pathfix --fixPath)\n');
    } catch (e) {
      process.stderr.write('Could not update persistent PATH. Run the command above in your PowerShell session.\n');
    }
  } else {
    process.stderr.write('Note: This tool is intended for Windows. The PATH command above is PowerShell syntax.\n');
  }
} else {
  process.stderr.write('rsync-windows-pathfix\n\n');
  process.stderr.write('Usage:\n');
  process.stderr.write('  npx github:rsxdalv/rsync-windows-pathfix --fixPath\n\n');
  process.stderr.write('Options:\n');
  process.stderr.write('  --fixPath  Add rsync to PATH for the current session and permanently\n\n');
  process.stderr.write('To update your current PowerShell session, run:\n');
  process.stderr.write('  Invoke-Expression (npx github:rsxdalv/rsync-windows-pathfix --fixPath)\n');
}
