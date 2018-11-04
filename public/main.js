let update = document.getElementById('update');

    update.addEventListener('click', function () {
        // Send PUT Request here
        console.log('in click method');
        fetch('productspage', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'pname': 'rajitha',
                'pid': '10'
            })
        }).then(res => {
            if (res.ok) return res.json()
        })
            .then(data => {
                console.log(data)
                window.location.reload(true)
            })

    })


let del = document.getElementById('delete')

    del.addEventListener('click', function () {
        fetch('productspage', {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'pname': 'rajitha'
            })
        })
            .then(res => {
                if (res.ok) return res.json()
            })
            .then(data => {
                console.log('deleted one appear here')
                console.log(data)
                window.location.reload()
            })
    })
