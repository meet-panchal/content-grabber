var data = JSON.parse(localStorage["data"]);
var host = JSON.parse(localStorage["host"]);
var images_arr = [];
var meta_arr = [];
var anc_arr = [];
var data_arr = data[0][host]
for (let key in data_arr) {
    for (let element of data_arr[key]) {
        if (key == 'image-src') {
            if (element != undefined && element != '') {
                images_arr.push(element)
            }

        }
        if (key == 'meta-tags') {
            if (element != undefined && element != '') {
                meta_arr.push(element)
            }

        }
        if (key == 'anchor-tags') {
            if (element != undefined && element != '') {
                anc_arr.push(element)
            }

        }
    }
}

var tableHtml = $('#table-body');
$(tableHtml).find('#img').text(images_arr.length)
$(tableHtml).find('#anc').text(anc_arr.length)
$(tableHtml).find('#meta').text(meta_arr.length)



function generateTable(table, data) {
    $('#table-body').DataTable().destroy();
    $('#table-body').html('');
    var tableHtml = '';
    for (let i = 0; i < data.length; i++) {
        var element = data[i];
        tableHtml += `<tr>
            <td>${element.customer_name}</td>
            <td>${element.customer_date}</td>
            <td>${element.customer_city}</td>
            <td>${element.customer_type}</td>
            <td>${element.customer_id}</td>
            <td>${element.pending_amount}</td>
            <td>${element.total_amount}</td>
            <td><i class='far fa-eye' data-id ="${element.customer_id}"></i>
            <i class='fas fa-user-edit' data-id ="${element.customer_id}"></i>
            <i class='fas fa-trash' data-id ="${element.customer_id}"></i>
            </td>
            </tr>`

    }
    $('#table-html').html(tableHtml);
    $('#mytable').DataTable({
        "autoWidth": true
    });
}