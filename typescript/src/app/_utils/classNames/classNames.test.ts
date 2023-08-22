import { cn } from './classNames';

describe('cn', () => {
    test('クラス名の上書きができているか', () => {
        expect(cn('px-1', 'px-2')).toBe('px-2');
    });
});
