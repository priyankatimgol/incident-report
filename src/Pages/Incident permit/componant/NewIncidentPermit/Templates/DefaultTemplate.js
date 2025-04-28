export const template = `
<div>
<img src='../Assest/print.png' style="margin-left: 48.5%;
width: 35px;
padding-right: 2px;
cursor: pointer;
margin-bottom: 14px;
margin-top: 25px ;cursor:pointer"  id=printPageButton onclick=window.print() />
</div>
<div class="container-fluid pdfPrint">
  <table style="border: 1px solid #000;width: 100%;">
    <tbody>
      <tr>
        <td style="width: 25%;padding: 0.5rem;">
          <h5 style="padding-top: 50px;">Location: {{extraDetails.zone}}</h5>  
        </td>
        <td style="width: 50%;background: red;color: #fff;padding: 30px 0;">
          <h4 style="text-align: center">
             MANAJEMEN INSIDEN </br>
             INCIDENT MANAGEMENT </br>
          </h4>
        </td>
        <td style="width: 25%;padding: 0.5rem;">
          <img src="../Assest/LOGOTEMP.jpg" class="logo" style="width: 100%;max-width: 100%;padding-top: 5px;" />
        </td>
      </tr>
      <tr style="border: 1px solid #000;">
        <td colspan="3" style="padding: 0 0.5rem;">
          <p style="margin: 0;font-size: 18px;fontWeight: bold;"><b>Incident Summary</b></p>
        </td>
      </tr>
      <tr>
        <td colspan="2" style="width: 25%;border-bottom: 1px solid #000;padding: 0.5rem;">
          <table class="w-100">
            <tbody>
              <tr>
                <td style="width: 25%;">&nbsp; </td>
              </tr>
              <tr>
              <div class="inline-flex">
                <p style="font-size: 14px;font-weight: 500;margin: 0;">Incident Date: {{extraDetails.date}} </p>
              </div>
              <div class="inline-flex">
                <p style="font-size: 14px;font-weight: 500;margin: 0;">Incident Time: {{extraDetails.Time}} </p>
              </div>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
            </tbody>
          </table> 
        </td>
        <td style="width: 25%;border-left: 1px solid #000;border-bottom: 1px solid #000;padding: 0.5rem;">
          <div>
            <div class="inline-flex">
              <p style="font-size: 14px;font-weight: 500;margin: 0;">No. Register:{{extraDetails.number}}</p>
            </div>
          </div>
        </td>
      </tr>
      <tr style="border-bottom: 1px solid #000;">
        <td style="padding: 0.5rem;">
          <div class="inline-flex">
            <p style="font-size: 14px;font-weight: 500;margin: 0;">Department Name: {{extraDetails.deparment}} </p>
          </div>
        </td>
      </tr>
      <tr style="border-bottom: 1px solid #000;">
        <td colspan="2" style="padding: 0.5rem;">
          <div class="inline-flex">
            <p style="font-size: 14px;font-weight: 500;margin: 0;">Incident Title : {{extraDetails.title}}</p>
          </div>
        </td>
      </tr>
      <tr style="border-bottom: 1px solid #000;">
        <td colspan="3" style="padding: 0.5rem;">
          <div class="inline-flex">
            <p style="height: 18px;font-size: 14px;font-weight: 500;margin: 0;">Incident Summary: {{extraDetails.summary}}</p>
          </div>
        </td>
      </tr>
      <tr style="border-bottom: 1px solid #000;">
      <td colspan="3" style="padding: 0.5rem;">
        <div class="inline-flex">
          <p style="height: 18px;font-size: 14px;font-weight: 500;margin: 0;">Reported By: {{extraDetails.reportedBy}}</p>
        </div>
      </td>
    </tr>
    </tbody>
  </table>
  <div/>`;
