$(function () {
    const tomb = [];
    const szuloElem = $("article");

    const apivegpont = "http://localhost:3000/konyvek";
    // const apivegpont =
    ("https://my-json-server.typicode.com/csefikatalin/jsonserverhez/konyvek");
    let mezoszerint = apivegpont + "?szerzo_like=Merle";
    let rendezes = apivegpont + "?_sort=szerzo&_order=asc";
    let szures = "ma";
    let szuresurl = apivegpont + `?q=${szures}`;
    /**Két érték között */
    let kisebbnagyobb = apivegpont + "?ar_gte=100&ar_lte=1500";
    //léptetés oldalanként
    let leptetes = apivegpont + "?_page=2&_limit=2";
    /**Új adat beszúrása */
    let ujKonyv = {
        cim: "A fák titkos élete",
        szerzo: "Peter Wohlleben",
        ar: 2000,
        tipus: "regény",
    };
    let modositKonyv = {
        id: "1",
        cim: "A sziget",
        szerzo: "Robert Merle",
        ar: 2000,
        tipus: "regény",
    };
    let torolID = "1";

    //getAdat(apivegpont, tomb, kiir, "Összes rekord");
    //getAdat(rendezes, tomb, kiir, "Rendezve szerző szerint");
    //getAdat(mezoszerint, tomb, kiir, "Mezőérték szerint");
    // getAdat(szuresurl, tomb, kiir, "Tetszőleges helyen lévő tartalom szerint");
    //getAdat(leptetes, tomb, kiir, "Léptetés oldalanként");
    //getAdat(kisebbnagyobb, tomb, kiir, "két ár között");
    $("#ujtermek").on("click", () => postAdat(apivegpont, ujKonyv));
    $("#modosit").on("click", () => modositAdat(apivegpont, modositKonyv));
    $("#torol").on("click", () => torolAdat(apivegpont, torolID));

    function getAdat(apivegpont, tomb, myCallback, szoveg) {
        tomb.splice(0, tomb.length);

        $.ajax({
            url: apivegpont,
            type: "GET",
            success: function (result) {
                console.log("result");
                result.forEach((element) => {
                    tomb.push(element);
                });

                myCallback(tomb, szoveg);
            },
        });
    }

    function postAdat(apivegpont, ujKonyv) {
        $.ajax({
            url: apivegpont,
            type: "POST",
            data: ujKonyv,
            success: function (result) {
                console.log(result);
                getAdat(apivegpont, tomb, kiir);
            },
        });
    }
    function modositAdat(apivegpont, modositKonyv) {
        $.ajax({
            url: apivegpont + "/" + modositKonyv.id,
            type: "PUT",
            data: modositKonyv,
            success: function (result) {
                console.log(result);
                getAdat(apivegpont, tomb, kiir);
            },
        });
    }
    function torolAdat(apivegpont, id) {
        $.ajax({
            url: "apivegpont" + "/" + id,
            type: "DELETE",

            success: function (result) {
                console.log(result);
                getAdat(apivegpont, tomb, kiir);
            },
        });
    }
    function kiir(tomb, szoveg) {
        console.log(tomb);
        let sablon = "<h2>" + szoveg + "</h2>";
        tomb.forEach((elem) => {
            sablon += `
            <div >
            <h3 >${elem.szerzo}</h3>
           
            <h4 class="cim">
            ${elem.cim}
            </h4>
            <p>${elem.tipus}</p>
         
            <span class="ar">${elem.ar}</span>
        </div>
            `;
        });
        szuloElem.html(sablon);
    }
});
