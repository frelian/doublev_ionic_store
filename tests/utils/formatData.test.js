import { cleanImageUrls, extractUrl } from '../../src/utils/formatData';

describe('formatData.js Utilities', () => {

    describe('1/2 cleanImageUrls function', () => {
        it('should clean valid image URLs', () => {
            const inputUrls = [
                'https://algo.com/image1.jpg',
                'http://test.com/image2.png',
                'url-invalida',
                'https://otro.com/image3.jpg?param=value'
            ];

            const result = cleanImageUrls(inputUrls);

            expect(result).toEqual([
                'https://algo.com/image1.jpg',
                'http://test.com/image2.png',
                'https://otro.com/image3.jpg?param=value'
            ]);
        });

        it('should return empty array for invalid URLs', () => {
            const inputUrls = ['invalido1', 'invalido2'];
            const result = cleanImageUrls(inputUrls);
            expect(result).toEqual([]);
        });

        it('should handle empty array', () => {
            const result = cleanImageUrls([]);
            expect(result).toEqual([]);
        });
    });

    describe('2/2 extractUrl function', () => {
        it('should extract URL from a string with URL', () => {
            const testString = 'Check out https://algo.com/';
            const result = extractUrl(testString);
            expect(result).toBe('https://algo.com/');
        });

        it('should extract first URL from multiple URLs', () => {
            const testString = 'Links: https://pagina.com and https://landing.com';
            const result = extractUrl(testString);
            expect(result).toBe('https://pagina.com');
        });

        it('should return null for string without URL', () => {
            const testString = 'No es una URL valida...';
            const result = extractUrl(testString);
            expect(result).toBeNull();
        });

        it('should handle URLs with query parameters', () => {
            const testString = 'URL with params: https://algo.com/page?param1=value1&param2=value2';
            const result = extractUrl(testString);
            expect(result).toBe('https://algo.com/page?param1=value1&param2=value2');
        });
    });
});