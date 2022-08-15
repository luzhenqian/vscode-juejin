import {publicIp, publicIpv4, publicIpv6} from 'public-ip';

console.log(await publicIp()); // Falls back to IPv4
//=> 'fe80::200:f8ff:fe21:67cf'

console.log(await publicIpv6());
//=> 'fe80::200:f8ff:fe21:67cf'

console.log(await publicIpv4());
//=> '46.5.21.123'