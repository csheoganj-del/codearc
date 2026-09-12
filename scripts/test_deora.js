async function run() {
  const deoraRes = await fetch('https://deora.vercel.app/');
  const deoraHtml = await deoraRes.text();
  console.log('Deora HTML length:', deoraHtml.length);
  
  const stayRes = await fetch('https://staysuite.codearc.co.in/');
  const stayHtml = await stayRes.text();
  console.log('StaySuite HTML length:', stayHtml.length);

  // Check if there are relative scripts or absolute scripts
  const scripts = deoraHtml.match(/src="[^"]+"/g) || [];
  console.log('Deora script samples:', scripts.slice(0, 5));
}
run();
