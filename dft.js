function dft(x) {

    let X = [];
    const N = x.length;

    for(let k = 0; k < N; k++)
    {
        let im = 0;
        let re = 0;
        for(let n = 0; n < N; n++)
        {
            let phi = (TWO_PI * k * n) / N;
            re += x[n] * cos(phi);
            im -= x[n] * sin(phi);
        }

        // Averaging the real and imaginary part
        re = re/N;
        im = im/N;

        let freq = k;
        let amp = sqrt(re * re + im * im);
        let phase = atan2(im, re);

        X[k] = { im, re, freq, amp, phase };
    }
    return X;
}

