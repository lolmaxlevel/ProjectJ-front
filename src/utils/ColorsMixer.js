    function hex2dec(hex) {
        const matched = hex.replace('#', '').match(/.{2}/g)
        if (!matched) throw new Error('Invalid hex string');
        return matched.map(n => parseInt(n, 16));
    }

    function rgb2hex(r, g, b) {
        r = Math.round(r);
        g = Math.round(g);
        b = Math.round(b);
        r = Math.min(r, 255);
        g = Math.min(g, 255);
        b = Math.min(b, 255);
        return '#' + [r, g, b].map(c => c.toString(16).padStart(2, '0')).join('');
    }

    export function mixHexes(hex2, hex1, ratio = 0.5) {
        if (ratio > 1 || ratio < 0) throw new Error('Invalid ratio');
        const [r1, g1, b1] = hex2dec(hex1);
        const [r2, g2, b2] = hex2dec(hex2);
        const r = Math.round(r1 * ratio + r2 * (1 - ratio));
        const g = Math.round(g1 * ratio + g2 * (1 - ratio));
        const b = Math.round(b1 * ratio + b2 * (1 - ratio));
        return rgb2hex(r, g, b);
    }