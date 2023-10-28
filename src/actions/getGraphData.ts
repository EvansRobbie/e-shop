import prisma from "@/libs/prismadb";
import moment from "moment";

export const getGraphData = async () => {
  try {
    // get the start and end dates for  the data range (7 days)
    const startDate = moment().subtract(6, "days").startOf("day");
    const endDate = moment().endOf("day");
    // query the database to get order by grouped by createdDate
    const result = await prisma.order.groupBy({
      by: ["createdAt"],
      where: {
        createdAt: {
          gte: startDate.toISOString(),
          lte: endDate.toISOString(),
        },
        status: "complete",
      },
      _sum: {
        amount: true,
      },
    });

    //initialize an Object to aggregate the data by day
    const aggregatedData: {
      [day: string]: { day: string; date: string; totalAmout: number };
    } = {};

    //create a clone of the start date to iterate through the days

    const currentDate = startDate.clone();
    //iterate over each day in the date range

    while (currentDate <= endDate) {
      //get the day of the week for the current date
      const day = currentDate.format("dddd");
      console.log("day <<<", day, currentDate);

      // initialize the aggeregated Data for the day with the day, date and totalAmount
      aggregatedData[day] = {
        day: day,
        date: currentDate.format("YYYY-MM-DD"),
        totalAmout: 0,
      };
      //move to the next day
      currentDate.add(1, "day");
    }

    // calculate the total amount for each day by summying the orser amounts
    result.forEach((entry) => {
      const day = moment(entry.createdAt).format("dddd");
      const amount = entry._sum.amount || 0;
      aggregatedData[day].totalAmout += amount;
    });
    //convert the aggeregated data to an array and sort it by date
    const formattedData = Object.values(aggregatedData).sort((a, b) =>
      moment(a.date).diff(moment(b.date))
    );
    //return the formated data
    return formattedData;
  } catch (err: any) {
    throw new Error(err);
  }
};
