$(document).ready(function(){
  
    let numAdults = 1;
    let dayIn = null;
    let dayOut = null;
    let numDays = null;
    let cost = null;

    function findNumDays(){
        if(dayIn && dayOut){
            numDays = dayOut.diff(dayIn,"days") 
            $('#displayDays').val(numDays + " days");
        }
    }

    function calcCost(){
        if(numAdults && dayIn && dayOut){
            cost = 150 * numAdults * numDays;
            $('#displayCost').val(cost);
        }
    }

    $('#checkIn').change(function(){
        dayIn = moment($(this).val());
        findNumDays();
        calcCost();
    })

    $('#checkOut').change(function(){
        dayOut = moment($(this).val());
        findNumDays();
        calcCost();
    })
    
    $('#adults').change(function(){
        numAdults = $('#adults option:selected').val();
        calcCost();
    })

    $("#reset").click(function(){
        toastr["info"]("Fields Successfully Cleared", "", {
            "closeButton": true,
            "positionClass": "toast-top-full-width",
        });
        numAdults = 1;
        dayIn = null;
        dayOut = null;   
        numDays = null;
        cost = null;
        $('#displayDays').html("Displays days...");
        $('#displayCost').html("Displays cost...");
        validator.resetForm(true);
    })

    const validator = $("#form").validate({
        rules:{
            displayCost:{
                min:1
            }
        },
        messages:{
            username:"",
            firstName:"",
            lastName:"",
            inputPhone:"",
            inputFax:"",
            inputEmail:"",
            displayCost:"",
        },
      
        highlight: function (element, errorClass) {
            const name = $(element).attr('name')
            let errorMSG = "Missing field" + name;
            if(name === "displayCost"){
                errorMSG = "No cost was calculated"
                if(cost<=0){
                    errorMSG = "Cost must be a positive number"
                }
            }
            toastr["error"](errorMSG, "", {
                "closeButton": true,
                "positionClass": "toast-top-right",
            });
            $(element).closest('.form-group').addClass('has-error');
        },
      
        unhighlight: function (element, errorClass) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        
        submitHandler: function(form){
            toastr["success"]("The form was successfully submitted", "", {
            "closeButton": true,
            "positionClass": "toast-top-full-width",
            });
            form.submit;
        },
    })
})