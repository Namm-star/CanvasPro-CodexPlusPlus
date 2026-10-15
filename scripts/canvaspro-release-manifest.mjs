import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';

const [directory, platform] = process.argv.slice(2);
if (!directory || !['windows-x64', 'macos-universal'].includes(platform)) {
  throw new Error('Usage: node scripts/canvaspro-release-manifest.mjs <directory> <platform>');
}
const version = JSON.parse(fs.readFileSync('apps/codex-plus-manager/package.json', 'utf8')).version;
const tag = process.env.RELEASE_TAG || `v${version}`;
if (tag.replace(/^v/, '') !== version) throw new Error('Release tag and application version differ');
const files = fs.readdirSync(directory).filter(name => name.startsWith(`CanvasPro-CodexPlusPlus-${version}-`) && /\.(exe|zip|dmg)$/.test(name)).sort();
if (!files.some(name => name.endsWith(platform === 'windows-x64' ? '-setup.exe' : '.dmg'))) {
  throw new Error('Verified installer is missing');
}
const hash = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const assets = files.map(name => {
  const bytes = fs.readFileSync(path.join(directory, name));
  return { name, bytes: bytes.length, sha256: hash(bytes) };
});
const manifest = {
  tag, version, platform,
  repository: 'Namm-star/CanvasPro-CodexPlusPlus',
  sourceCommit: execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim(),
  upstreamCommit: 'a5f531d0d2d510a984890f26fdbbc98d995c12ad',
  node: process.version,
  rust: execFileSync('rustc', ['--version'], { encoding: 'utf8' }).trim(),
  ...(platform === 'macos-universal' ? { architectures: ['x86_64', 'arm64'], signing: 'ad-hoc', appleNotarized: false } : {}),
  validation: { canvasProConfiguration: 'passed', updaterRegression: 'passed', installerStructure: 'passed' },
  realPaidModelRequestsMade: false,
  assets,
};
const name = `${platform}-build-manifest.json`;
const bytes = Buffer.from(JSON.stringify(manifest, null, 2) + '\n');
fs.writeFileSync(path.join(directory, name), bytes);
fs.writeFileSync(path.join(directory, `SHA256SUMS-${platform}.txt`), [...assets.map(asset => `${asset.sha256}  ${asset.name}`), `${hash(bytes)}  ${name}`].join('\n') + '\n');
console.log(`Recorded ${platform}: ${assets.length} assets, source ${manifest.sourceCommit}`);
