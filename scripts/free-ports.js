const { execSync } = require('child_process');

const PORTS = [9030, 5173];

function freePortWindows(port) {
  try {
    const output = execSync(`netstat -ano | findstr :${port}`, { encoding: 'utf8' });
    const pids = new Set();

    for (const line of output.split('\n')) {
      if (!line.includes('LISTENING')) continue;
      const parts = line.trim().split(/\s+/);
      const pid = parts[parts.length - 1];
      if (pid && pid !== '0') pids.add(pid);
    }

    for (const pid of pids) {
      try {
        execSync(`taskkill /PID ${pid} /F`, { stdio: 'ignore' });
        console.log(`Freed port ${port} (PID ${pid})`);
      } catch {
        // process may have already exited
      }
    }
  } catch {
    // no process on this port
  }
}

function freePortUnix(port) {
  try {
    const pid = execSync(`lsof -ti :${port}`, { encoding: 'utf8' }).trim();
    if (pid) {
      execSync(`kill -9 ${pid}`, { stdio: 'ignore' });
      console.log(`Freed port ${port} (PID ${pid})`);
    }
  } catch {
    // no process on this port
  }
}

const freePort = process.platform === 'win32' ? freePortWindows : freePortUnix;

for (const port of PORTS) {
  freePort(port);
}
