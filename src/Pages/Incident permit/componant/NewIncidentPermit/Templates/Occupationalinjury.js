export const Occupationalinjury = `
<div>
<img src='../Assest/print.png' style="margin-left: 48.5%;
width: 35px;
padding-right: 2px;
cursor: pointer;
margin-bottom: -42px;
margin-top: 25px ;cursor:pointer"  id=printPageButton onclick=window.print() />
</div>
<div class="container mt-5 mb-5">
<div class="container-fluid pdfPrint">
  <table class="" style="border: 1px solid #000 !important;width: 100%;">
    <tbody>
      <tr>
        <td style="width: 75%;padding: 0.5rem;">
          <h5>Preliminary Incident Report</h5> 
          <p>Sent to the IncidentReport_R&P@pertamina.com mailist</p> 
        </td>
        <td style="width: 25%;padding: 0.5rem;">
        <img src="../Assest/LOGOTEMP.jpg" class="logo" style="width: 100%;max-width: 100%;padding-top: 5px;" />
        </td>
      </tr>
    </tbody>
  </table>

  <table style="border: 1px solid #000;border-top: none;width: 100%;">
    <tbody>
      <tr style="background: #fff;vertical-align: baseline;">
        <td style="width: 20%;padding: 0.5rem;">
          <p style="margin: 0;font-size: 12px;padding-bottom: 10px;"><b>Incident Type:</b></p>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;" {% if  extraDetails.typeid == 20 %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">HIPO (High Potential) </p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;" {% if  extraDetails.typeid == 21 %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Occupational Injury </p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;" {% if  extraDetails.typeid == 22 %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Occupational Illness</p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;" {% if  extraDetails.typeid == 23 %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Nearmiss </p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;" {% if  extraDetails.typeid == 24 %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Environmental Damage</p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;" {% if  extraDetails.typeid == 25 %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Property Damage</p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;" {% if  extraDetails.typeid == 26 %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Security Incident</p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;" {% if  extraDetails.typeid == 27 %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Motorcycle Vehicle Crash </p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;" {% if  extraDetails.typeid == 28 %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Disaster Natural</p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;" {% if  extraDetails.typeid == 29 %} checked {% endif %}  class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Others</p></label>
          </div>
        </td>
        <td style="width: 20%;border-left: 1px solid #000;">
          <p style="font-size: 12px;padding-bottom: 100px;"><b>Reported by: {{extraDetails.reportedBy}}</b></p>
          <p style="font-size: 12px;border-top: 1px solid #000;margin: 0;padding: 5px;"><b>Deparment:{{extraDetails.deparment}} </b></p>
        </td>
        <td style="width: 20%;border-left: 1px solid #000;">
          <p style="font-size: 12px;"><b>Date Occur Incident: {{extraDetails.date}}</b></p>
        </td>
        <td style="width: 20%;border-left: 1px solid #000;">
          <p style="font-size: 12px;"><b>Time Occur Incident: {{extraDetails.Time}}</b></p>
        </td>
        <td style="width: 20%;border-left: 1px solid #000;">
          <p style="font-size: 12px;"><b>Location Incident: {{extraDetails.zone}}</b></p>
        </td>
      </tr>
    </tbody>
  </table>

  <table style="border: 1px solid #000;border-top: none;width: 100%;">
    <tbody>
      <tr style="border-bottom: 1px solid #000;background: #E6E6E6;">
        <td colspan="5" style="padding: 0 0.5rem;">
          <p style="font-size: 12px;margin: 0;"><b>FACT</b></p>
        </td>
      </tr>
      <tr style="background: #fff;vertical-align: baseline;">
        <td style="width: 20%;">
          <p style="font-size: 12px;padding-bottom: 10px;"><b>Initials Category Occupational Injury:</b></p>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;" {% if   InitialCategory.fatality %} checked {% endif %}  class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Fatality </p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;"  {% if    InitialCategory.rwdc %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">RWDC </p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;"  {% if    InitialCategory.lti %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">LTI </p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;"  {% if    InitialCategory.mtc %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">MTC </p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;"  {% if    InitialCategory.firstAid %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">First Aid </p></label>
          </div>

          <p style="font-size: 12px;border-top: 1px solid #000;margin: 0;padding: 5px;"><b>Employment Victim: </b></p>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;" {% if extraDetails.incidentinvolved.emp == true %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Employee</p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;"  {% if  extraDetails.incidentinvolved.out == true %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Third Party</p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;"  {% if  extraDetails.incidentinvolved.cont == true %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Contractor </p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;"  {% if  extraDetails.incidentinvolved.visitor == true %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Visitor</p></label>
          </div>

          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;"  {% if  extraDetails.incidentinvolved.other==true %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Others</p></label>
          </div>

         
        </td>
        <td style="width: 20%;border-left: 1px solid #000;">
          <p style="font-size: 12px;padding-bottom: 10px;"><b>Initials Category Occupational Illness:</b></p>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;" {% if  InitialCategoryOccupationalIllness.illness %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Illness</p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;" {% if  InitialCategoryOccupationalIllness.illnessFatality %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Illness Fatality</p></label>
          </div>

          <p style="font-size: 12px;border-top: 1px solid #000;margin: 0;padding: 5px;margin-top: 63px;"><b>Initials Category Security Incidents: </b></p>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;" {% if  InitialCategorySecurity.illegalDrilling %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Illegal Drilling </p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;" {% if InitialCategorySecurity.illegalTapping %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Illegal Tapping </p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;" {% if  InitialCategorySecurity.theft %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Theft </p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;" {% if InitialCategorySecurity.demonstration %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Demonstration </p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;" {% if  InitialCategorySecurity.externalAssault %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">External Assault </p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;" {% if  InitialCategorySecurity.kidnapingOther %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Kidnaping Other</p></label>
          </div>
        </td>
        <td style="width: 20%;border-left: 1px solid #000;">
          <p style="font-size: 12px;padding-bottom: 10px;"><b>Initials Environmental Damage Accident Type:</b></p>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;" {% if  InitialEnvironmentalDamage.hydrocarbponOilSpill %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">hydrocarbpon/Oil spill </p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;" {% if  InitialEnvironmentalDamage.gasLeakRelease %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Gas Leak/release </p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;" {% if  InitialEnvironmentalDamage.hazardousWaste %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Hazardous Waste</p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;" {% if  InitialEnvironmentalDamage.chemicalRelease %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Chemical Release </p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;" {% if  InitialEnvironmentalDamage.other %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Other </p></label>
          </div>

          <p style="font-size: 12px;padding-bottom: 10px;padding-top: 30px;"><b>Severity :</b></p>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;" class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Major ( >15 barrel or become national issues)</p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;" class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Medium (5-15 barrel or become local issues)</p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;" class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Minor (1-5 barrel)</p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;" class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Insignificant ( <1 barrel)</p></label>
          </div>
        </td>
        <td style="width: 20%;border-left: 1px solid #000;">
          <p style="font-size: 12px;padding-bottom: 10px;"><b>Initials Property Damage Accident Type:</b></p>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;" {% if  InitialPropertyDamage.hydrocarbponOilSpill%} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Vehicle/Cargo Accident </p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;" {% if  InitialPropertyDamage.gasLeakRelease %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Fire/Explosion</p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;" {% if  InitialPropertyDamage.hazardousWaste %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Blowout</p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;" {% if  InitialPropertyDamage.chemicalRelease %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Production Loss </p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;" {% if  InitialPropertyDamage.other %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Other Property/ Material Damage</p></label>
          </div>

          <p style="font-size: 12px;padding-bottom: 10px;padding-top: 30px;"><b>Severity :</b></p>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;" class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Major (>US$ 1,000,000)</p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;" class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Medium (US$ 100,000 - US$ 1,000,000)</p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;" class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Minor (US$ 10,000 - US$ 100,000)</p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;" class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Insignificant (< US$ 10,000)</p></label>
          </div>
        </td>
        <td style="width: 20%;border-left: 1px solid #000;">
          <p style="font-size: 12px;padding-bottom: 10px;"><b>The initials Motor Vehicle Crash(MVC)</b></p>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true}  style="margin: 5px !important;" {% if  InitialMotorVehicle.mvcK %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">MVC - K </p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;" {% if  InitialMotorVehicle.mvcB %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">MVC - B</p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;" {% if  InitialMotorVehicle.mvcR %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">MVC - S</p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;" {% if  InitialMotorVehicle.mvcR1 %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">MVC - R</p></label>
          </div>
          <p style="font-size: 10px;padding-top: 10px;font-weight: 500;">Information classification MVC could seen in description on page attached</p>
        </td>
      </tr>
      <tr style="background: #fff;vertical-align: baseline;">
      <td colspan="5" style="border-left: 1px solid #000;">
        <table class="border-remove" style="width:100%;">
          <tbody>
            {% for data in PersonalDetails %}
            <tr style="border-bottom: 0.5px solid #000;border-top: 0.5px solid #000;">
              {% for item in data.data %}
                {%- if forloop.index0 == 0 -%}
                <td style="padding: 0px;padding-left: 10px;">
                  <p style="font-size: 12px;font-weight: 500;">Name</p>
                </td>
                {%- endif -%}
                <td style="padding: 0px;">
                  <p style="font-size: 10px;font-weight: 500;padding-left: 10px;">{{item.personalName_1}}</p>
                </td>
              {% endfor %}
            </tr>
              <tr style="">
                {% for item in data.data %}
                    {%- if forloop.index0 == 0 -%}
                    <td style="width: 288px;padding: 0px;padding-left: 10px;">
                      <p style="font-size: 12px;font-weight: 500;">Age(Year)</p>
                    </td>
                    {%- endif -%}
                    <td style="padding: 0px;border-left: 0.5px solid #000;border-right: 0.5px solid #000;">
                    <p style="font-size: 10px;font-weight: 500;padding-left: 10px;">{{item.personalAge_1}}</p>
                    </td>
                {% endfor %}
              </tr>
            {% endfor %}
          </tbody>
        </table>
      </td>
    </tr>
    </tbody>
    </table>
    <table style="border: 1px solid #000;border-top: none;width: 100%;">
        <tbody>
      <tr style="border-bottom: 1px solid #000;">
        <td colspan="4" style="padding: 0 0.5rem;">
          <p style="font-size: 12px;margin: 0px;padding-bottom: 100px;"><b>Incident(Title ): {{extraDetails.title}}</b></p>
        </td>
      </tr>
      <tr>
      <td colspan="5" style="padding: 0 0.5rem;">
        <p style="font-size: 12px;margin: 0px;padding-bottom: 20px;"><b>Chronology complete (5W 1H):</b></p>
      </td>
    </tr>
    <tr>  
    <td colspan="1" style="padding: 0 0.5rem;">
      <p style="font-size: 12px;margin: 0px;padding-bottom: 20px;">Root Cause</p>
    </td>
    <td colspan="3"  style="padding: 11px 0.5rem;">
    <p disabled={true} style="min-height: 46px !important;height: 100%;width:100%;margin: inherit !important;" type="text" class="form-control" id="safetyRequirement2" placeholder="" name="safetyRequirement2" style="height: auto;margin: inherit;padding: 0.175rem 0.75rem;">{{Investigation.rootCause}}</p>
    </td>
    </tr>
        <tr>
          <td colspan="1" style="padding: 0 0.5rem;width: 150px;">
            <p style="font-size: 12px;margin: 0px;">When</p>
          </td>
          <td colspan="3"  style="padding: 11px 0.5rem;">
    <p disabled={true} style="min-height: 46px !important;height: 100%;width:100%;margin: inherit !important;" type="text" class="form-control" id="safetyRequirement2" placeholder="" name="safetyRequirement2" style="height: auto;margin: inherit;padding: 0.175rem 0.75rem;">{{Investigation.textField}}</p>
    
          </td>
        </tr>
        <tr>
          <td colspan="1" style="padding: 0 0.5rem;">
    
            <p style="font-size: 12px;margin: 0px;">Where</p>
    
          </td>
          <td colspan="3"  style="padding: 11px 0.5rem;">
    <p disabled={true} style="min-height: 46px !important;height: 100%;width:100%;margin: inherit !important;" type="text" class="form-control" id="safetyRequirement2" placeholder="" name="safetyRequirement2" style="height: auto;margin: inherit;padding: 0.175rem 0.75rem;">{{Investigation.textField3}}</p>
    
          </td>
          
        </tr>
        <tr>
          <td colspan="1" style="padding: 0 0.5rem;">
    
            <p style="font-size: 12px;margin: 0px;">Who</p>
    
          </td>
          <td colspan="3"  style="padding: 11px 0.5rem;">
    <p disabled={true} style="min-height: 46px !important;height: 100%;width:100%;margin: inherit !important;" type="text" class="form-control" id="safetyRequirement2" placeholder="" name="safetyRequirement2" style="height: auto;margin: inherit;padding: 0.175rem 0.75rem;">{{Investigation.textField6}}</p>
    
          </td>
          
        </tr>
        <tr>
        <td colspan="1" style="padding: 0 0.5rem;">
    
          <p style="font-size: 12px;margin: 0px;">What</p>
    
        </td>
        <td colspan="3"  style="padding: 11px 0.5rem;">
         <p disabled={true} style="min-height: 46px !important;height: 100%;width:100%;margin: inherit !important;" type="text" class="form-control" id="safetyRequirement2" placeholder="" name="safetyRequirement2" style="height: auto;margin: inherit;padding: 0.175rem 0.75rem;">{{Investigation.textField9}}</p>
    
        </td>
        
      </tr>
      <tr>
      <td colspan="1" style="padding: 0 0.5rem;">
    
        <p style="font-size: 12px;margin: 0px;">Why</p>
    
      </td>
      <td colspan="3"  style="padding: 11px 0.5rem;">
      <p disabled={true} style="min-height: 46px !important;height: 100%;width:100%;margin: inherit !important;" type="text" class="form-control" id="safetyRequirement2" placeholder="" name="safetyRequirement2" style="height: auto;margin: inherit;padding: 0.175rem 0.75rem;">{{Investigation.textField12}}</p>
    
      </td>
     
    </tr>
    <tr>
    <td colspan="1" style="padding: 0 0.5rem;">
    
      <p style="font-size: 12px;margin: 0px;">How</p>
    
    </td>
    <td colspan="3"  style="padding: 11px 0.5rem;">
    <p disabled={true} style="min-height: 46px !important;height: 100%;width:100%;margin: inherit !important;" type="text" class="form-control" id="safetyRequirement2" placeholder="" name="safetyRequirement2" style="height: auto;margin: inherit;padding: 0.175rem 0.75rem;">{{Investigation.textField13}}</p>
    
    </td>
    
    </tr>
    </tbody>
  </table>

  <table style="border: 1px solid #000;border-top: none;width: 100%;">
    <tbody>
      <tr style="border-bottom: 1px solid #000;background: #fff;vertical-align: baseline;">
        <td style="width: 20%;border-left: 1px solid #000;">
          <p style="font-size: 12px;padding-bottom: 10px;"><b>Type Activity </b></p>
          <p style="font-size: 12px;font-weight: 500;padding-bottom: 10px;">Choose box Which in accordance</p>
          <p style="font-size: 10px;font-weight: 500;padding-bottom: 10px;text-align: right;">Reff: SCAT</p>
        </td>
        <td style="border-left: 1px solid #000;">  
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;" {% if  ActivityType.struckAgaintsIntoRunningBumpingCollidingGroundingCrashing %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Struck Against/Into (Running/Bumping/Colliding/Grounding/Crashing) </p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;"  {% if  ActivityType.struckByHitByMovingObject %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Struck By (Hit By Moving Object)</p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;"  {% if  ActivityType.fallFromElevationPersonEquipmentMaterial %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Fall From Elevation (Person/Equipment/Material)</p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;"  {% if  ActivityType.explosionVapourCloudDustPressureBurstBleve %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Explosion (Vapour Cloud/Dust/Pressure Burst/BLEVE)</p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;"  {% if  ActivityType.failureOfMechanicalEquipment %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Failure Of Mechanical Equipment</p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;"  {% if  ActivityType.failureOfInstrumentationLogicLoop1 %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Failure Of Electric System</p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;"  {% if  ActivityType.failureOfInstrumentationLogicLoop %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Failure Of Instrumentation/Logic/Loop</p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;"  {% if  ActivityType.failureOfStructure %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Failure Of Structure</p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;"  {% if  ActivityType.abnormalOperationProcess %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Abnormal Operation/Process</p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;"  {% if  ActivityType.disturbance %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Disturbance</p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;"  {% if  ActivityType.instability %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Instability</p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;"  {% if  ActivityType.securityTheftBlockageIllegalDrillingTappingDestructionThreatLandGrabbingDemonstration  %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Security/Theft/Blockage/Illegal Drilling- Tapping/Destruction/Threat/Land Grabbing/ Demonstration</p></label>
          </div>
        </td>
        <td>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;"  {% if  ActivityType.lossOfPrimaryContainment %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Loss Of Primary Containment</p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;"  {% if  ActivityType.releaseToAirWaterIntoSoilOntoStructure %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Release (To Air/Water/ Into Soil/ Onto Structure)</p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;"  {% if  ActivityType.firePoolFireJetFireFlashFire %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Fire (Pool Fire/Jet Fire/Flash Fire)</p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;"  {% if  ActivityType.fallOnSameLevelSlipAndFallTripOver %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Fall On Same Level (Slip And Fall/Trip Over)</p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;"  {% if  ActivityType.caughtInOnBetweenOrUnder %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Caught In, On, Between Or Under</p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true}  style="margin: 5px !important;"  {% if  ActivityType.contactWithElectricity %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Contact With Electricity</p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;"  {% if  ActivityType.contactWithNoise %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Contact With Noise</p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;"  {% if  ActivityType.contactWithVibration %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Contact With Vibration</p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;"  {% if  ActivityType.contactWithRadiation %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Contact With Radiation</p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;"  {% if  ActivityType.failureOfHumanBodyFunctions %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Failure Of Human Body Functions</p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;"  {% if  ActivityType.overstressByOverloadOverpressureErgonomicFactors %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Overstress (By Overload/Overpressure/Ergonomic Factors)</p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;"  {% if  ActivityType.contactWithHazardousSubstanceDoseToxicCorrosiveCarcinogenicBiologicalViral %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Contact With Hazardous Substance/Dose (Toxic/Corrosive/Carcinogenic/Biological/Viral)</p></label>
          </div>
        </td>
      </tr>
      <tr style="border-bottom: 1px solid #000;background: #fff;vertical-align: baseline;">
        <td style="width: 20%;border-left: 1px solid #000;">
          <p style="font-size: 12px;padding-bottom: 10px;"><b>Activity When Incident Occur</b></p>
          <p style="font-size: 12px;font-weight: 500;padding-bottom: 10px;">Choose Box which in accordance</p>
          <p style="font-size: 10px;font-weight: 500;padding-bottom: 10px;text-align: right;">ref : IOGP</p>
        </td>
        <td style="border-left: 1px solid #000;">
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;"  {% if Activity1Category.struckAgaintsIntoRunningBumpingCollidingGroundingCrashing %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Construction, Commissioning, Decommissioning </p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;"  {% if Activity1Category.struckByHitByMovingObject %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Diving, Subsea, ROV</p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;"  {% if Activity1Category.fallFromElevationPersonEquipmentMaterial %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Drilling, Workover, Well Services</p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;"  {% if Activity1Category.fallOnSameLevelSlipAndFallTripOver %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Lifting, Crane, Rigging, Deck Operations</p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;"  {% if Activity1Category.caughtInOnBetweenOrUnder %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Maintenance, Inspection, Testing</p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;"  {% if Activity1Category.failureOfInstrumentationLogicLoop1 %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Unspecified – Others : {{Activity1Category.textField}}</p></label>
          </div>
        </td>
        <td>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;"  {% if Activity1Category.lossOfPrimaryContainment %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Production Operations</p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;"  {% if Activity1Category.releaseToAirWaterIntoSoilOntoStructure %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Seismic/Survey Operations</p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;"  {% if Activity1Category.firePoolFireJetFireFlashFire %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Transport – Air</p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;"  {% if Activity1Category.explosionVapourCloudDustPressureBurstBleve %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Transport – Land</p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;"  {% if Activity1Category.failureOfMechanicalEquipment %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Transport – Water, Including Marine Activity</p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;"  {% if Activity1Category.contactWithNoise %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Office, Warehouse, Accomodation, Catering</p></label>
          </div>
        </td>
      </tr>
      <tr style="background: #fff;vertical-align: baseline;">
        <td style="width: 20%;border-left: 1px solid #000;">
          <p style="font-size: 12px;padding-bottom: 10px;"><b>Related Corporate Life Saving Rules</b></p>
          <p style="font-size: 12px;font-weight: 500;padding-bottom: 10px;">Choose box Which in accordance</p>
        </td>
        <td style="border-left: 1px solid #000;">
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true}  style="margin: 5px !important;"  {% if   CorporateLife.struckAgaintsIntoRunningBumpingCollidingGroundingCrashing %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Tools & Equipment </p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true}  style="margin: 5px !important;"  {% if  CorporateLife.struckByHitByMovingObject %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Safe Zone Position</p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;"  {% if   CorporateLife.fallFromElevationPersonEquipmentMaterial %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Permit To Work</p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;"  {% if   CorporateLife.fallOnSameLevelSlipAndFallTripOver %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Isolation</p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;"  {% if   CorporateLife.caughtInOnBetweenOrUnder %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Confined Space</p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;"  {% if  CorporateLife.contactWithNoise %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Lifting Operation</p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;"  {% if   CorporateLife.failureOfInstrumentationLogicLoop2 %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Others</p></label>
          </div>
        </td>
        <td>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;"  {% if   CorporateLife.lossOfPrimaryContainment %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Fit To Work</p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;"  {% if   CorporateLife.releaseToAirWaterIntoSoilOntoStructure %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Working At Heights</p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;"  {% if   CorporateLife.firePoolFireJetFireFlashFire %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Personal Floating Device</p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;"  {% if  CorporateLife.explosionVapourCloudDustPressureBurstBleve %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">System Override</p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;"  {% if   CorporateLife.failureOfMechanicalEquipment %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Asset Integrity</p></label>
          </div>
          <div style="display: flex;align-items: center; position: relative;">
            <input disabled={true} style="margin: 5px !important;"  {% if  CorporateLife.failureOfInstrumentationLogicLoop1 %} checked {% endif %} class="form-check-input" type="checkbox" id="to" name="to" value="something" >
            <label class="form-check-label"><p style="font-size: 10px;font-weight: 500;margin: 0;">Driving Safety</p></label>
          </div>
        </td>
      </tr>
      <tr style="background: #fff;vertical-align: baseline;border-top: 1px solid #000;">
      <td style="width: 20%;border-left: 1px solid #000;">
        <p style="font-size: 12px;padding-bottom: 10px;"><b>Pictures</b></p>
        <p style="font-size: 12px;font-weight: 500;padding-bottom: 10px;">Sketch/Photos</p>
        
      </td>
      <td colspan="2" style="width: 20%;border-left: 1px solid #000;">
        &nbsp;
        
      </td>
    </tr>
    <tr style="background: #fff;vertical-align: baseline;">
    <td colspan="3" style="border-left: 1px solid #000;">
      <table class="border-remove" style="width:100%;">
        <tbody>
          {% for data in PictureImage %}
          <tr style="border-bottom: 0.5px solid #000;border-top: 0.5px solid #000;">
            {% for item in data.data %}
              {%- if forloop.index0 == 0 -%}
              <td style="padding: 0px;padding-left: 10px;">
                <p style="font-size: 10px;font-weight: 500;">Name</p>
              </td>
              {%- endif -%}
              <td style="padding: 0px;border-left: 0.5px solid #000;">
                <p style="font-size: 10px;font-weight: 500;padding-left: 10px;">{{item.originalName}}</p>
              </td>
            {% endfor %}
          </tr>
            <tr style="">
              {% for item in data.data %}
                  {%- if forloop.index0 == 0 -%}
                  <td style="width: 288px;padding: 0px;padding-left: 10px;">
                    <p style="font-size: 10px;font-weight: 500;">&nbsp</p>
                  </td>
                  {%- endif -%}
                  <td style="padding: 0px;border-left: 0.5px solid #000;">
                    <img style="max-height:115px;width: 150px;padding: 10px;" src={{item.url}} alt="Red dot" />
                  </td>
              {% endfor %}
            </tr>
          {% endfor %}
        </tbody>
      </table>
    
    </td>
  </tr>
    </tbody>
  </table>
</div>
</div>`;
