/* приведение к числу после toFixed нужно для того, чтобы отбросить незначительные нули, если они есть: 17.00 → 17 */
export default x => (+x.toFixed(2)).toString().replace('.', ',').replace('-', '−'); // eslint-disable-line
