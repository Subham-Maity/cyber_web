import catchAsyncError from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/errorHandler";
import Company from "../model/Company";
import EditorContent from "../model/Editor";

export const addCompany = catchAsyncError(async (req, res, next) => {

    if (!req.body) {
        return next(new ErrorHandler("body not found", 400));
    }

    const company = await Company.create(req.body);



    res.status(201).json({
        company,
        success: true,
        message: "Compony Added successfully",

    })
})
export const getCompanies = catchAsyncError(async (req, res, next) => {


    const companies = await Company.find();



    res.status(201).json({
        companies,
        success: true,
        message: "Compony Added successfully",

    })
})
export const addEditorContent = catchAsyncError(async (req, res, next) => {

    const { content } = req.body;
    const newContent = new EditorContent({ content });
    await newContent.save();
    res.status(201).send('Content saved successfully');

})
export const getEditorContent = catchAsyncError(async (req, res, next) => {

    const content = await EditorContent.find({});
    res.json(content);

})