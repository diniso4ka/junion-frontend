import { useEffect, useRef } from 'react';

export function useMountEffect(effect: Parameters<typeof useEffect>[0]) {
	const effectRef = useRef(effect);

	useEffect(() => {
		effectRef.current();
	}, []);
}
