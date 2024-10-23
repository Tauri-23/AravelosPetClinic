<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\inventory_categories;
use Illuminate\Http\Request;

class inventoryCategoriesController extends Controller
{
    // POST
    public function createCategory(Request $request)
    {
        $existCategory = inventory_categories::where('name', $request->name)->exists();

        if($existCategory)
        {
            return response()->json([
                'status' => 401,
                'message' => 'Category already exists.'
            ]);
        }

        $category = new inventory_categories();
        $category->name = $request->name;

        
        
        if($category->save())
        {
            $newCat = inventory_categories::where('name', $request->name)->first();

            return response()->json([
                'status' => 200,
                'message' => 'Success',
                'category' => $newCat
            ]);
        }
        else{
            return response()->json([
                'status' => 401,
                'message' => 'Something went wrong please try again later'
            ]);
        }
    }

    public function editCategory(Request $request)
    {
        $category = inventory_categories::find($request->id);

        if(!$category)
        {
            return response()->json([
                'status' => 404,
                'message' => 'Category not found'
            ]);
        }

        $category->name = $request->name;
        $category->save();

        return response()->json([
            'status' => 200,
            'message' => 'Edited category'
        ]);
    }

    public function deleteCategory(Request $request)
    {
        $category = inventory_categories::find($request->id);

        if(!$category)
        {
            return response()->json([
                'status' => 404,
                'message' => 'Category not found'
            ]);
        }

        if($category->inventory()->count() > 0)
        {
            return response()->json([
                'status' => 400,
                'message' => 'Cannot delete category with associated inventories.'
            ]);
        }

        $category->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Category deleted'
        ]);
    }





    // GET
    public function getAllCategories()
    {
        return response()->json(inventory_categories::all());
    }
}
