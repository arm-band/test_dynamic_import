import part3 from './parts3';

window.addEventListener('load', () => {
    console.log('part2!');
    if (typeof part3 === 'function') {
        part3();
    }
});
