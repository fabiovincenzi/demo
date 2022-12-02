// ---------------------------------------------------------------------------------------
//                                        ILGPU
//                           Copyright (c) 2022 ILGPU Project
//                                    www.ilgpu.net
//
// File: redirect.js
//
// This file is part of ILGPU and is distributed under the University of Illinois Open
// Source License. See LICENSE.txt for details.
// ---------------------------------------------------------------------------------------

function redirectAfterFew() {
    setTimeout(function () {
        window.location.href = '/';
    }, 3000);
}

window.addEventListener('load', redirectAfterFew);
