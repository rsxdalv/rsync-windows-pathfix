#!/usr/bin/env node
'use strict';

const { execSync } = require('child_process');

const RSYNC_PATH = 'C:\\ProgramData\\chocolatey\\lib\\rsync\\tools\\bin';
const args = process.argv.slice(2);

const sessionCmd = `$env:Path = "${RSYNC_PATH};$env:Path"`;

function persistPath() {
  if (process.platform === 'win32') {
    try {
      const psCmd = `[Environment]::SetEnvironmentVariable('Path', '${RSYNC_PATH};' + [Environment]::GetEnvironmentVariable('Path', 'User'), 'User')`;
      execSync(`powershell.exe -NoProfile -Command "${psCmd}"`, { stdio: 'pipe' });
      process.stderr.write('rsync path added to user PATH permanently.\n');
      process.stderr.write('Restart your shells or sign out/in to apply the change to new sessions.\n');
      process.stderr.write('To apply to the current session immediately run:\n');
      process.stderr.write(`  ${sessionCmd}\n`);
      return true;
    } catch (e) {
      process.stderr.write('Could not update persistent PATH. Run the persistent command manually in PowerShell.\n');
      return false;
    }
  } else {
    process.stderr.write('Note: This tool is intended for Windows. The persistent PATH change uses PowerShell.\n');
    return false;
  }
}

if (args.includes('--fixSession')) {
  // Only output the PowerShell command to update the current session
  process.stdout.write(sessionCmd + '\n');
} else if (args.includes('--persist')) {
  // Only attempt to persistently add to user PATH
  persistPath();
} else {
  process.stderr.write('rsync-windows-pathfix\n\n');
  process.stderr.write('Usage:\n');
  process.stderr.write('  npx github:rsxdalv/rsync-windows-pathfix --fixSession\n');
  process.stderr.write('  npx github:rsxdalv/rsync-windows-pathfix --persist\n\n');
  process.stderr.write('Options:\n');
  process.stderr.write('  --fixSession  Print PowerShell command to update PATH for current session only\n');
  process.stderr.write('  --persist     Add rsync path to user PATH permanently\n');
  process.stderr.write('\nExamples:\n');
  process.stderr.write('  Invoke-Expression (npx github:rsxdalv/rsync-windows-pathfix --fixSession)\n');
}
