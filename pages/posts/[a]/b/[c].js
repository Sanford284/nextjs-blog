import { useRouter } from 'next/router';

export default function Test() {
    const router = useRouter();
    console.log('====', router);
    return <div>test</div>;
}
