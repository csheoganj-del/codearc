async function run() {
  const res = await fetch('https://wildjawai.in/');
  const html = await res.text();
  console.log('wildjawai length:', html.length);
  console.log('isAppRouter:', html.includes('self.__next_f'), 'isPagesRouter:', html.includes('__NEXT_DATA__'));
}
run();
