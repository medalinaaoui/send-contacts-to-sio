import puppeteer from "puppeteer";
import addContact from "./sendTobrevo.js";
import fs from "fs";
const getContacts = async () => {
  const browser = await puppeteer.launch({ timeout: 90000 });
  const page = await browser.newPage();

  await page.setExtraHTTPHeaders({
    accept: "*/*",
    "accept-language": "en-US,en;q=0.9,fr;q=0.8,ar;q=0.7",
    "if-none-match": '"pjdn7t74t3sgb"',
    priority: "u=1, i",
    purpose: "prefetch",
    "sec-ch-ua":
      '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-nextjs-data": "1",
    "cookie": `funnel_3042526_selected_step=9503963; funnel_3031902_selected_step=9520179; systemeio_split_test_31631=9639965; v=01HR53REGD4B6R1MGQQBMFSMW1; close_systeme_page_14892492_popup_ffa5113d-d15d-4d21-a3e5-91c8859701f9=1; funnel_3128585_selected_step=9984865; funnel_3158348_selected_step=9884833; funnel_3215260_selected_step=10080520; funnel_3221970_selected_step=10103500; _tt_enable_cookie=1; _ttp=zYHTNXnDMZ_XGZ_RXTYO4Xe81q0; _ga_KYTT3N0DL7=GS1.1.1710855737.1.0.1710855744.0.0.0; funnel_3128732_selected_step=9786843; funnel_2877887_selected_step=8991695; funnel_2637785_selected_step=8385041; funnel_3157192_selected_step=9939144; _fbp=fb.1.1711469857315.174611083; funnel_3158358_selected_step=10361898; funnel_3315616_selected_step=10429360; funnel_3110617_selected_step=9728372; funnel_3289265_selected_step=10759191; funnel_3135979_selected_step=9810754; systemeio_split_test_34887=8636556; close_systeme_page_13318012_popup_3a53e794-e848-443d-87ac-e8b16bdbb268=1; funnel_1900235_selected_step=5035788; funnel_3476657_selected_step=11029338; funnel_3476661_selected_step=11029350; funnel_3562969_selected_step=11340638; funnel_3427467_selected_step=10914280; systemeio_split_test_36377=11211557; close_systeme_page_17253801_popup_3a53e794-e848-443d-87ac-e8b16bdbb268=1; funnel_3658910_selected_step=11689796; _gcl_au=1.1.1034767349.1716914955; funnel_3519174_selected_step=11216002; funnel_3667336_selected_step=11796698; funnel_3694234_selected_step=11821596; funnel_3537777_selected_step=11250845; funnel_3695884_selected_step=11824894; funnel_3696005_selected_step=11825341; funnel_3658315_selected_step=11687783; funnel_3652137_selected_step=11665476; funnel_3675134_selected_step=11866125; funnel_3557570_selected_step=11321174; systemeio_split_test_37407=11980422; close_systeme_page_18489094_popup_3a53e794-e848-443d-87ac-e8b16bdbb268=1; funnel_3708743_selected_step=11871444; funnel_3708679_selected_step=11871199; _gid=GA1.2.1077716877.1718008592; _clck=1csugim%7C2%7Cfmi%7C0%7C1577; funnel_3658708_selected_step=11689095; funnel_3762497_selected_step=12066014; funnel_3765953_selected_step=12078631; funnel_3662075_selected_step=12072992; funnel_3778128_selected_step=12107534; funnel_3158346_selected_step=9884827; funnel_3749976_selected_step=12103771; __stripe_mid=ccb0f262-ddcd-40f4-a27c-d8e3fe255f86362285; uslug=505757da2b44ef65a2b24ac3d39904f16f70fa; dashboard_locale=en; sio_trusted_device=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTgxOTAxNTcuODExNjE1LCJleHAiOjE3MTg3OTQ5NTcuODExNTkyLCJ1c3IiOiJkaWdpdGFsc3BlYWsuc2FybEBnbWFpbC5jb20iLCJmd2wiOiJzeXN0ZW1laW8iLCJ2c24iOjB9.4XwbLA4tdxdLLbDYEDYU-lf5ogZ79NdmpGMzen4cRxo; funnel_3737210_selected_step=12084910; sio_u=8qb67kv5ejl9esmurmr96v7cul; systeme_affiliate_systemeio=sa00049710141577f695203eb02b688cff58ea7ff9f8; tk_systemeio=a-p; _gcl_aw=GCL.1718193497.CjwKCAjwjqWzBhAqEiwAQmtgT7PQIg_S6_AJcmrBzExXqU5FBlxCuHKe0P-sX0jP6RYeVzkPzQPnpRoCzvIQAvD_BwE; _gac_UA-2610411-14=1.1718193498.CjwKCAjwjqWzBhAqEiwAQmtgT7PQIg_S6_AJcmrBzExXqU5FBlxCuHKe0P-sX0jP6RYeVzkPzQPnpRoCzvIQAvD_BwE; _ga=GA1.2.1400414352.1714465428; _gat_gtag_UA_2610411_14=1; _ga_XCFQZ5TE6W=GS1.1.1718201742.14.0.1718201745.57.0.0; sio_api=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MTgyMDE3NTIsImV4cCI6MTcxODgwNjU1MiwiaWQiOjUwNTc1NywiZW1haWwiOiJkaWdpdGFsc3BlYWsuc2FybEBnbWFpbC5jb20ifQ.AsJEBToHMimMQFQpZxhXFQMgEPsOpmvDV9jjn8lQnUhIXtyFeKVtSrt_VKLjdZQc-pQZj2Pc4FYZF7veOs28b03wq7baRFZKNxNf7eRXM1oBsyawygFV9pNhKxMx9XaVk1IUpSRaxnbuhjyula_MZMDu_HyitekNHiYjPC_uy0P_XZWFxEDwVE1UvfGFUkUqkboCBo3inR7wPU8Pv0q9SwU3eMOjt3M4yiPtscEFXG9POEPbmb8lfbIA7j25bqnyBIGCBn8_Hn8W6MqUUa5w9sg3fnB5-Kr9dqvI86YkmPcRpLMn0XVeeIS5wnT3mOzSVGtkTmRInIDTqsW9np5uUg`,
    "Referer": "https://systeme.io/home",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  });


  await page.goto("https://systeme.io/dashboard/contacts", {
    waitUntil: "networkidle2",
    timeout: 90000,
  });

  await page.screenshot({path: "22.png"});
  await page.waitForSelector('[aria-roledescription="sortable"]');

  const scrapeEmails = async () => {
    const emails = await page.evaluate(() => {
      const emailElements = document.querySelectorAll(
        '[aria-roledescription="sortable"] a.primary-link'
      );
      return Array.from(emailElements).map((email) =>
        email.getAttribute("href")
      );
    });

    return emails;
  };

  const getLastEmailId = async (emails) => {
    if (emails.length === 0) return null;
    const lastEmail = emails[emails.length - 1];
    const lastEmailId = lastEmail.split("/").pop();
    return lastEmailId;
  };

  // Initial scrape
  let allEmails = await scrapeEmails();
  let lastEmailId = await getLastEmailId(allEmails);

  while (lastEmailId) {
    const nextButton = await page.$(
      ".items-center.gap-5 .flex.gap-3 button.rounded-lg:nth-child(2)"
    );

    const isDisabled = await page.evaluate(
      (button) => button.disabled,
      nextButton
    );
    if (isDisabled) break;

    const nextPageUrl = `https://systeme.io/dashboard/contacts?startFromId=${lastEmailId}`;
    await page.goto(nextPageUrl, {
      waitUntil: "networkidle2",
      timeout: 90000,
    });
    nextButton;
    const nextEmails = await scrapeEmails();
    if (nextEmails.length === 0) break;

    allEmails = allEmails.concat(nextEmails);
    lastEmailId = await getLastEmailId(nextEmails);
  }

  // console.log("allEmails: ", allEmails);
  await browser.close();
  const uniqueEmailList = uniqueEmails(allEmails);
  return uniqueEmailList;
};

function uniqueEmails(emails) {
  // Use Set to automatically remove duplicates
  const uniqueEmailSet = new Set(emails);

  // Convert Set back to array
  const uniqueEmailArray = Array.from(uniqueEmailSet);

  return uniqueEmailArray;
}








const getTargetInfo = async (url) => {
  const browser = await puppeteer.launch({ timeout: 90000 });
  const page = await browser.newPage();

  await page.setExtraHTTPHeaders({
    accept: "*/*",
    "accept-language": "en-US,en;q=0.9,fr;q=0.8,ar;q=0.7",
    "if-none-match": '"pjdn7t74t3sgb"',
    priority: "u=1, i",
    purpose: "prefetch",
    "sec-ch-ua":
      '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-nextjs-data": "1",
    "cookie": `funnel_3042526_selected_step=9503963; funnel_3031902_selected_step=9520179; systemeio_split_test_31631=9639965; v=01HR53REGD4B6R1MGQQBMFSMW1; close_systeme_page_14892492_popup_ffa5113d-d15d-4d21-a3e5-91c8859701f9=1; funnel_3128585_selected_step=9984865; funnel_3158348_selected_step=9884833; funnel_3215260_selected_step=10080520; funnel_3221970_selected_step=10103500; _tt_enable_cookie=1; _ttp=zYHTNXnDMZ_XGZ_RXTYO4Xe81q0; _ga_KYTT3N0DL7=GS1.1.1710855737.1.0.1710855744.0.0.0; funnel_3128732_selected_step=9786843; funnel_2877887_selected_step=8991695; funnel_2637785_selected_step=8385041; funnel_3157192_selected_step=9939144; _fbp=fb.1.1711469857315.174611083; funnel_3158358_selected_step=10361898; funnel_3315616_selected_step=10429360; funnel_3110617_selected_step=9728372; funnel_3289265_selected_step=10759191; funnel_3135979_selected_step=9810754; systemeio_split_test_34887=8636556; close_systeme_page_13318012_popup_3a53e794-e848-443d-87ac-e8b16bdbb268=1; funnel_1900235_selected_step=5035788; funnel_3476657_selected_step=11029338; funnel_3476661_selected_step=11029350; funnel_3562969_selected_step=11340638; funnel_3427467_selected_step=10914280; systemeio_split_test_36377=11211557; close_systeme_page_17253801_popup_3a53e794-e848-443d-87ac-e8b16bdbb268=1; funnel_3658910_selected_step=11689796; _gcl_au=1.1.1034767349.1716914955; funnel_3519174_selected_step=11216002; funnel_3667336_selected_step=11796698; funnel_3694234_selected_step=11821596; funnel_3537777_selected_step=11250845; funnel_3695884_selected_step=11824894; funnel_3696005_selected_step=11825341; funnel_3658315_selected_step=11687783; funnel_3652137_selected_step=11665476; funnel_3675134_selected_step=11866125; funnel_3557570_selected_step=11321174; systemeio_split_test_37407=11980422; close_systeme_page_18489094_popup_3a53e794-e848-443d-87ac-e8b16bdbb268=1; funnel_3708743_selected_step=11871444; funnel_3708679_selected_step=11871199; _gid=GA1.2.1077716877.1718008592; _clck=1csugim%7C2%7Cfmi%7C0%7C1577; funnel_3658708_selected_step=11689095; funnel_3762497_selected_step=12066014; funnel_3765953_selected_step=12078631; funnel_3662075_selected_step=12072992; funnel_3778128_selected_step=12107534; funnel_3158346_selected_step=9884827; funnel_3749976_selected_step=12103771; __stripe_mid=ccb0f262-ddcd-40f4-a27c-d8e3fe255f86362285; uslug=505757da2b44ef65a2b24ac3d39904f16f70fa; dashboard_locale=en; sio_trusted_device=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTgxOTAxNTcuODExNjE1LCJleHAiOjE3MTg3OTQ5NTcuODExNTkyLCJ1c3IiOiJkaWdpdGFsc3BlYWsuc2FybEBnbWFpbC5jb20iLCJmd2wiOiJzeXN0ZW1laW8iLCJ2c24iOjB9.4XwbLA4tdxdLLbDYEDYU-lf5ogZ79NdmpGMzen4cRxo; funnel_3737210_selected_step=12084910; sio_u=8qb67kv5ejl9esmurmr96v7cul; systeme_affiliate_systemeio=sa00049710141577f695203eb02b688cff58ea7ff9f8; tk_systemeio=a-p; _gcl_aw=GCL.1718193497.CjwKCAjwjqWzBhAqEiwAQmtgT7PQIg_S6_AJcmrBzExXqU5FBlxCuHKe0P-sX0jP6RYeVzkPzQPnpRoCzvIQAvD_BwE; _gac_UA-2610411-14=1.1718193498.CjwKCAjwjqWzBhAqEiwAQmtgT7PQIg_S6_AJcmrBzExXqU5FBlxCuHKe0P-sX0jP6RYeVzkPzQPnpRoCzvIQAvD_BwE; _ga=GA1.2.1400414352.1714465428; _gat_gtag_UA_2610411_14=1; _ga_XCFQZ5TE6W=GS1.1.1718201742.14.0.1718201745.57.0.0; sio_api=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MTgyMDE3NTIsImV4cCI6MTcxODgwNjU1MiwiaWQiOjUwNTc1NywiZW1haWwiOiJkaWdpdGFsc3BlYWsuc2FybEBnbWFpbC5jb20ifQ.AsJEBToHMimMQFQpZxhXFQMgEPsOpmvDV9jjn8lQnUhIXtyFeKVtSrt_VKLjdZQc-pQZj2Pc4FYZF7veOs28b03wq7baRFZKNxNf7eRXM1oBsyawygFV9pNhKxMx9XaVk1IUpSRaxnbuhjyula_MZMDu_HyitekNHiYjPC_uy0P_XZWFxEDwVE1UvfGFUkUqkboCBo3inR7wPU8Pv0q9SwU3eMOjt3M4yiPtscEFXG9POEPbmb8lfbIA7j25bqnyBIGCBn8_Hn8W6MqUUa5w9sg3fnB5-Kr9dqvI86YkmPcRpLMn0XVeeIS5wnT3mOzSVGtkTmRInIDTqsW9np5uUg`,
    "Referer": "https://systeme.io/home",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  });


  await page.goto(`https://systeme.io${url}`, {
    waitUntil: "networkidle2",
    timeout: 120000,
  });
  await page.screenshot({path: "44.png"})
  await page.waitForSelector(".rounded-lg.bg-white.flex.flex-col.gap-5.p-5");
  // await page.screenshot({ path: "2.png" });

  const target = await page.evaluate(() => {
    const email = document.querySelector('[placeholder="Email"]') || "";
    const firstName =
      document.querySelector('[placeholder="First name"]') || "";
    const lastName = document.querySelector('[placeholder="Last name"]') || "";
    const country = document.querySelector('[placeholder="Country"]') || "";
    const city = document.querySelector('[placeholder="City"]') || "";
    const phoneNumber =
      document.querySelector('[placeholder="Phone number"]') || "";
    const language = document.querySelector('[placeholder="Language"]') || "";

    if (
      email &&
      firstName &&
      lastName &&
      country &&
      city &&
      phoneNumber &&
      language
    ) {
      return {
        email: email.getAttribute("value"),
        firstName: firstName.getAttribute("value"),
        lastName: lastName.getAttribute("value"),
        country: country.getAttribute("value"),
        city: city.getAttribute("value"),
        phoneNumber: phoneNumber.getAttribute("value"),
        language: language.getAttribute("value"),
      };
    } else {
      return null;
    }
  });
  await browser.close();
  return target;
};

const getAllInfos = async () => {
  try {
    const contacts = await getContacts();
    // saveTargets(contacts)
    console.log(contacts)

    for (const contact of contacts) {
      if (contact) {
        console.log("starts");
        const contactInfos = await getTargetInfo(contact);
        addContact(contactInfos)
        console.log(contactInfos);
      }
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

getAllInfos();

// //  "headers": {
// //     "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
// //     "accept-language": "en-US,en;q=0.9,fr;q=0.8,ar;q=0.7",
// //     "cache-control": "no-cache",
// //     "pragma": "no-cache",
// //     "priority": "u=1, i",
// //     "sec-ch-ua": "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
// //     "sec-ch-ua-mobile": "?1",
// //     "sec-ch-ua-platform": "\"Android\"",
// //     "sec-fetch-dest": "image",
// //     "sec-fetch-mode": "no-cors",
// //     "sec-fetch-site": "same-origin",
// //     "cookie": "funnel_3042526_selected_step=9503963; funnel_3031902_selected_step=9520179; systemeio_split_test_31631=9639965; v=01HR53REGD4B6R1MGQQBMFSMW1; close_systeme_page_14892492_popup_ffa5113d-d15d-4d21-a3e5-91c8859701f9=1; funnel_3128585_selected_step=9984865; funnel_3158348_selected_step=9884833; funnel_3215260_selected_step=10080520; funnel_3221970_selected_step=10103500; _tt_enable_cookie=1; _ttp=zYHTNXnDMZ_XGZ_RXTYO4Xe81q0; _ga_KYTT3N0DL7=GS1.1.1710855737.1.0.1710855744.0.0.0; funnel_3128732_selected_step=9786843; funnel_2877887_selected_step=8991695; funnel_2637785_selected_step=8385041; funnel_3157192_selected_step=9939144; _fbp=fb.1.1711469857315.174611083; funnel_3158358_selected_step=10361898; funnel_3315616_selected_step=10429360; funnel_3110617_selected_step=9728372; funnel_3289265_selected_step=10759191; uslug=505757da2b44ef65a2b24ac3d39904f16f70fa; sio_u=olg03qu4aofos44p7skklp1brd; dashboard_locale=en; funnel_3135979_selected_step=9810754; systemeio_split_test_34887=8636556; close_systeme_page_13318012_popup_3a53e794-e848-443d-87ac-e8b16bdbb268=1; funnel_1900235_selected_step=5035788; funnel_3476657_selected_step=11029338; funnel_3476661_selected_step=11029350; funnel_3562969_selected_step=11340638; funnel_3427467_selected_step=10914280; systemeio_split_test_36377=11211557; close_systeme_page_17253801_popup_3a53e794-e848-443d-87ac-e8b16bdbb268=1; funnel_3658910_selected_step=11689796; _gcl_au=1.1.1034767349.1716914955; funnel_3519174_selected_step=11216002; funnel_3667336_selected_step=11796698; funnel_3694234_selected_step=11821596; funnel_3537777_selected_step=11250845; funnel_3695884_selected_step=11824894; funnel_3696005_selected_step=11825341; funnel_3658315_selected_step=11687783; funnel_3652137_selected_step=11665476; funnel_3675134_selected_step=11866125; funnel_3557570_selected_step=11321174; funnel_3737210_selected_step=11975469; systemeio_split_test_37407=11980422; close_systeme_page_18489094_popup_3a53e794-e848-443d-87ac-e8b16bdbb268=1; funnel_3708743_selected_step=11871444; funnel_3708679_selected_step=11871199; _gid=GA1.2.1077716877.1718008592; _clck=1csugim%7C2%7Cfmi%7C0%7C1577; funnel_3658708_selected_step=11689095; funnel_3762497_selected_step=12066014; funnel_3765953_selected_step=12078631; funnel_3662075_selected_step=12072992; funnel_3778128_selected_step=12107534; funnel_3158346_selected_step=9884827; funnel_3749976_selected_step=12103771; _ga=GA1.2.1400414352.1714465428; _ga_XCFQZ5TE6W=GS1.1.1718124956.12.0.1718124964.52.0.0; sio_api=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MTgxMjUxMTEsImV4cCI6MTcxODcyOTkxMSwiaWQiOjUwNTc1NywiZW1haWwiOiJkaWdpdGFsc3BlYWsuc2FybEBnbWFpbC5jb20ifQ.CZt_g1XVok9jLwtvbxGXKPp2GjL09naKIhYlzcXLoBFXOJOBbtrxWgMQBYWeTAsmrltqHcHPBE8SR_rEYsRhLEKAyArWP_xhB7e7h9LWecOY0zE6n0U1OZOOJtvkILc1hcMGGhq9AWdHjcujfkxqPHfEAkyfy7A17SmJxoppjA4rEp9nTVWwCtKEtdKqLIL0ZylZUl9JmexOBoBpXr0ZhBHegKqMaswVOGJ7xFq1JPDrtUY65phghmQG2cRy_fHQor43pBdhkjM8rmDEBgfzxjM3CTxLLMv-EniN7M8zvyLv-6h6Jhoo-F3X1dlYhuAqCt0hE6CtNjWSpB1aTpYb4w",
// //     "Referer": "https://systeme.io/dashboard/contacts",
// //     "Referrer-Policy": "strict-origin-when-cross-origin"
//   // },





// async function saveTargets(targets) {
//   try {
//     const outputPath = "eslup.json";

//     // Read existing targets from file
//     let existingTargets = [];
//     try {
//       const fileData = await fs.readFile(outputPath);
//       existingTargets = JSON.parse(fileData);
//     } catch (error) {
//       // If file doesn't exist or is empty, continue with empty array
//       console.log("File doesn't exist or is empty:", error.message);
//     }

//     // Merge existing targets with new targets
//     const updatedTargets = [...existingTargets, ...targets];

//     // Write updated targets to file
//     await fs.writeFile(outputPath, JSON.stringify(updatedTargets, null, 2));

//     console.log("Targets successfully saved to:", outputPath);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }

// // Example usage
// const newTargets = ["target1", "target2", "target3"];
// saveTargets(newTargets);